'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function LenisGSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const onScroll = () => ScrollTrigger.update()
    const tickerFn = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', onScroll)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tickerFn)
    }
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  )
}
