'use server'

import fs from 'fs'
import path from 'path'

export type RSVPState = {
  success: boolean
  message: string
} | null

export type RSVPEntry = {
  id: string
  timestamp: string
  team: 'bride' | 'groom'
  /** Same as radio "Will you be joining the celebrations?" — **Yes** / **No** for Google Sheet column */
  joiningCelebrations: 'Yes' | 'No'
  /** Raw form value `joining` — **yes** / **no** (mirrors the RSVP page radios) */
  joining: 'yes' | 'no'
  attending: boolean
  name: string
  phone: string
  guests: number
  arrivalDate: string
  arrivalTime: string
  accommodation: boolean
  message: string
}

const SUCCESS_MESSAGE_ATTENDING = (name: string) =>
  `Thank you, ${name}! Your RSVP has been received. We can't wait to celebrate with you! 🎉`
const SUCCESS_MESSAGE_NOT_ATTENDING = 'Thank you for letting us know!'

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308])

function isHtmlResponse(text: string): boolean {
  const trimmed = text.trimStart().toLowerCase()
  return trimmed.startsWith('<!') || trimmed.includes('<html')
}

function parseScriptSuccess(text: string): { ok: boolean; reason?: string } {
  if (!text.trim()) return { ok: true }
  if (isHtmlResponse(text)) {
    return { ok: false, reason: 'HTML response from Apps Script (auth/deployment/URL issue)' }
  }
  try {
    const j = JSON.parse(text) as { success?: boolean; error?: string }
    if (j.success === false) return { ok: false, reason: j.error ?? 'Apps Script returned success:false' }
    return { ok: true }
  } catch {
    // Some Apps Script deployments can return non-JSON success payloads.
    return { ok: true }
  }
}

/**
 * POST JSON to a Google Apps Script web app.
 * script.google.com often responds with 302; default fetch follows with GET and **drops the body**,
 * so doPost never runs with your payload — fix by replaying POST to each Location URL.
 */
async function appendToGoogleSheet(entry: RSVPEntry): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEB_APP_URL
  if (!url?.trim()) return false

  const body = JSON.stringify(entry)
  let currentUrl = url.trim()

  try {
    // Strategy 1: regular follow-mode POST (works in some environments).
    const direct = await fetch(currentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      body,
      redirect: 'follow',
      cache: 'no-store',
    })

    const directText = await direct.text()
    if (direct.ok) {
      const parsed = parseScriptSuccess(directText)
      if (parsed.ok) return true
      console.error('[RSVP Google Sheet] Follow-mode response issue:', parsed.reason)
    } else {
      console.error('[RSVP Google Sheet] Follow-mode HTTP', direct.status, directText.slice(0, 600))
    }

    // Strategy 2: manual redirect chain preserving POST/body for every hop.
    for (let hop = 0; hop < 8; hop++) {
      const res = await fetch(currentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body,
        redirect: 'manual',
        cache: 'no-store',
      })

      if (REDIRECT_STATUSES.has(res.status)) {
        const loc = res.headers.get('Location')
        if (!loc) {
          console.error('[RSVP Google Sheet] Redirect without Location', res.status)
          return false
        }
        currentUrl = new URL(loc, currentUrl).href
        continue
      }

      const text = await res.text()

      if (!res.ok) {
        console.error('[RSVP Google Sheet] HTTP', res.status, text.slice(0, 600))
        return false
      }

      const parsed = parseScriptSuccess(text)
      if (!parsed.ok) {
        console.error('[RSVP Google Sheet] Manual-mode response issue:', parsed.reason)
        return false
      }

      return true
    }

    console.error('[RSVP Google Sheet] Too many redirects')
    return false
  } catch (e) {
    console.error('[RSVP Google Sheet] Fetch failed:', e)
    return false
  }
}

export async function submitRSVP(
  _prevState: RSVPState,
  formData: FormData,
): Promise<RSVPState> {
  const name = (formData.get('name') as string | null)?.trim()
  const joiningRaw = formData.get('joining') as string | null
  const attending = joiningRaw === 'yes'
  const teamRaw = formData.get('team') as string | null
  const team = teamRaw === 'groom' ? 'groom' : 'bride'
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const guestsRaw = formData.get('guests') as string | null
  const guests = Math.max(0, Math.min(20, parseInt(guestsRaw ?? '0', 10) || 0)) || (attending ? 1 : 0)
  const arrivalDate = (formData.get('arrivalDate') as string | null)?.trim() ?? ''
  const arrivalTime = (formData.get('arrivalTime') as string | null)?.trim() ?? ''
  const accommodation = attending && formData.get('accommodation') === 'yes'
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (!name) {
    return { success: false, message: 'Please enter your name.' }
  }
  if (joiningRaw !== 'yes' && joiningRaw !== 'no') {
    return { success: false, message: 'Please let us know if you will be joining the celebrations.' }
  }
  if (attending) {
    const acc = formData.get('accommodation')
    if (acc !== 'yes' && acc !== 'no') {
      return { success: false, message: 'Please let us know if you need accommodation.' }
    }
    const g = parseInt(guestsRaw ?? '0', 10) || 0
    if (g < 1) {
      return { success: false, message: 'Please enter the number of guests.' }
    }
  }

  const entry: RSVPEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    team,
    joiningCelebrations: attending ? 'Yes' : 'No',
    joining: attending ? 'yes' : 'no',
    attending,
    name,
    phone,
    guests: attending ? Math.max(1, guests) : 0,
    arrivalDate,
    arrivalTime,
    accommodation,
    message,
  }

  // 1. Try Google Sheet if URL is set
  if (process.env.GOOGLE_SHEET_WEB_APP_URL) {
    const sheetOk = await appendToGoogleSheet(entry)
    if (sheetOk) {
      return {
        success: true,
        message: attending ? SUCCESS_MESSAGE_ATTENDING(name) : SUCCESS_MESSAGE_NOT_ATTENDING,
      }
    }
    // If sheet fails and we're on Vercel/serverless, don't fall back to file
    if (process.env.VERCEL) {
      return {
        success: false,
        message: 'Something went wrong. Please try again or reach out to us directly.',
      }
    }
  }

  // 2. Fallback: file-based storage (local / self-hosted)
  const dataDir = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDir, 'rsvps.json')

  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    let rsvps: RSVPEntry[] = []
    if (fs.existsSync(filePath)) {
      try {
        rsvps = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      } catch {
        rsvps = []
      }
    }

    rsvps.push(entry)
    fs.writeFileSync(filePath, JSON.stringify(rsvps, null, 2), 'utf-8')

    return {
      success: true,
      message: attending ? SUCCESS_MESSAGE_ATTENDING(name) : SUCCESS_MESSAGE_NOT_ATTENDING,
    }
  } catch (err) {
    console.error('RSVP write error:', err)
    return {
      success: false,
      message: 'Something went wrong. Please try again or reach out to us directly.',
    }
  }
}
