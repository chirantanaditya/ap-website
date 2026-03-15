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

/** Append one row to Google Sheet via Apps Script web app URL */
async function appendToGoogleSheet(entry: RSVPEntry): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEB_APP_URL
  if (!url?.trim()) return false

  try {
    const res = await fetch(url.trim(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
    return res.ok
  } catch {
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
