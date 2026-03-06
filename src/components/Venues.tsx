'use client'

import { motion, useReducedMotion } from 'motion/react'

type Venue = {
  id: string
  title: string
  subtitle: string
  description: string
  mapUrl?: string
  mapLabel?: string
  events: string[]
}

const venues: Venue[] = [
  {
    id: 'main',
    title: 'Venue: Cherish Ballrooms',
    subtitle: 'Delhi',
    description: 'The main celebration venue hosting the Sangeet Night and the Wedding ceremonies.',
    mapUrl: 'https://maps.app.goo.gl/AY1pt43ew5eQ8ejh9?g_st=ic',
    mapLabel: 'View on Google Maps',
    events: ['Sangeet – 28 Apr', 'Baraat, Varmala & Pheras – 30 Apr'],
  },
  {
    id: 'haldi-groom',
    title: "Venue: Home",
    subtitle: 'Delhi',
    description: "The venue for the Groom's Haldi celebrations.",
    mapUrl: 'https://maps.app.goo.gl/W2ZacHZtYRvZxZGu8?g_st=ic',
    mapLabel: 'View on Google Maps',
    events: ["Groom's Haldi – 29 Apr, 5 PM Onwards"],
  },
  {
    id: 'haldi-bride',
    title: "Bride's Events Venue",
    subtitle: "Sharma's House, Mehrauli",
    description: "All Bride-side ceremonies will be hosted at the Sharma's family residence in Mehrauli.",
    events: [
      "Bride's Haldi – 29 Apr, 10 AM Onwards",
      'Mehendi – 29 Apr, 4 PM Onwards',
    ],
  },
]

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function revealProps(delay: number, reduced: boolean) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: EASE, delay },
  }
}

export default function Venues() {
  const reduced = useReducedMotion()

  return (
    <section
      id="venues"
      className="px-5 pt-[8rem] pb-16 sm:pt-32 sm:pb-20 max-w-2xl mx-auto"
      aria-label="Venue information"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        {...revealProps(0, reduced ?? false)}
      >
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">
          Where to find us
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl italic text-maroon font-light">
          Venues
        </h2>
      </motion.div>

      {/* Venue cards */}
      <div className="flex flex-col gap-5">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.id}
            className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm"
            {...revealProps(i * 0.1, reduced ?? false)}
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-maroon leading-snug">
                    {venue.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm text-text-mid font-body mt-1">
                    <MapPinIcon />
                    {venue.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-mid font-body leading-relaxed">
                {venue.description}
              </p>

              {/* Events tags */}
              <ul className="flex flex-wrap gap-2">
                {venue.events.map((ev) => (
                  <li
                    key={ev}
                    className="bg-cream-dark text-text-mid text-xs font-body px-3 py-1.5 rounded-full border border-border"
                  >
                    {ev}
                  </li>
                ))}
              </ul>

              {/* Map link */}
              {venue.mapUrl && (
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-body font-medium text-maroon border border-maroon rounded-full px-5 py-2.5 w-full sm:w-auto justify-center transition-all duration-200 hover:bg-maroon hover:text-cream active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
                >
                  <MapPinIcon />
                  {venue.mapLabel}
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
