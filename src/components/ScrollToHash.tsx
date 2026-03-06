'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

const NAV_OFFSET_PX = 128

export default function ScrollToHash() {
  const lenis = useLenis()

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id) as HTMLElement | null
    if (!el) return
    const scroll = () => {
      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET_PX })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    const t = setTimeout(scroll, 350)
    return () => clearTimeout(t)
  }, [lenis])

  return null
}
