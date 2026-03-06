'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  const motionProps = (delay: number) =>
    reduced
      ? {}
      : { ...fadeUp(delay), viewport: { once: true } }

  function scrollToRSVP() {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-cream"
      aria-label="Wedding invitation hero"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, #F0E8DA 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, #E8D5C0 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center flex flex-col items-center gap-6">
        {/* Top tag */}
        <motion.p
          className="text-xs tracking-[0.25em] uppercase text-gold font-body font-medium"
          {...motionProps(0)}
        >
          28 – 30 April · Delhi, India
        </motion.p>

        {/* Ornament */}
        <motion.div className="w-full max-w-xs" {...motionProps(0.1)}>
          <Ornament />
        </motion.div>

        {/* Couple names */}
        <motion.div
          className="flex flex-col items-center gap-1"
          {...motionProps(0.15)}
        >
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-light italic text-maroon leading-none tracking-wide">
            Purnima
          </h1>
          <span
            className="font-heading text-3xl sm:text-4xl text-gold font-light italic leading-none select-none"
            aria-label="and"
          >
            &amp;
          </span>
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-light italic text-maroon leading-none tracking-wide">
            Anurag
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-heading text-lg sm:text-xl text-text-mid font-light italic max-w-xs leading-relaxed"
          {...motionProps(0.25)}
        >
          are inviting you to celebrate their marriage
        </motion.p>

        {/* Ornament */}
        <motion.div className="w-full max-w-xs" {...motionProps(0.3)}>
          <Ornament />
        </motion.div>

        {/* Date + location */}
        <motion.div
          className="flex flex-col items-center gap-1.5"
          {...motionProps(0.35)}
        >
          <p className="font-heading text-2xl sm:text-3xl text-text-dark font-medium tracking-wide">
            28<sup>th</sup>–30<sup>th</sup> April
          </p>
          <p className="text-sm tracking-[0.2em] uppercase text-text-mid font-body">
            Delhi, India
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-4 flex flex-col sm:flex-row gap-3 w-full max-w-xs" {...motionProps(0.45)}>
          <button
            onClick={scrollToRSVP}
            className="flex-1 min-h-[52px] bg-maroon text-cream font-body font-medium text-sm tracking-[0.12em] uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-maroon-light active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
          >
            RSVP Now
          </button>
          <a
            href="#schedule"
            className="flex-1 min-h-[52px] flex items-center justify-center border border-maroon text-maroon font-body font-medium text-sm tracking-[0.12em] uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-maroon/5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
          >
            See Schedule
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-1.5 text-text-light"
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1, duration: 0.6 } })}
          aria-hidden
        >
          <p className="text-xs tracking-widest uppercase font-body">Scroll</p>
          <motion.div
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <polyline points="2,5 8,11 14,5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
