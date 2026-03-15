'use client'

import { motion, useReducedMotion } from 'motion/react'

type Event = { time: string; label: string }

type DayCard = {
  day: string
  date: string
  weekday: string
  emoji: string
  columns?: { side: string; events: Event[] }[]
  events?: Event[]
}

const schedule: DayCard[] = [
  {
    day: '28',
    date: '28 April',
    weekday: 'Tuesday',
    emoji: '🎶',
    events: [{ time: '7 PM Onwards', label: 'Sangeet Night' }],
  },
  {
    day: '29',
    date: '29 April',
    weekday: 'Wednesday',
    emoji: '🌿',
    columns: [
      {
        side: "Groom's Side",
        events: [{ time: '5 PM Onwards', label: 'Haldi' }],
      },
      {
        side: "Bride's Side",
        events: [
          { time: '12 PM Onwards', label: 'Haldi' },
          { time: '6PM onwards.', label: 'Mehendi' },
        ],
      },
    ],
  },
  {
    day: '30',
    date: '30 April',
    weekday: 'Thursday',
    emoji: '🌸',
    events: [
      { time: '5 PM Onwards', label: 'Baraat' },
      { time: '7PM', label: 'Jaimaal' },
      { time: '8 PM', label: 'Pheras' },
    ],
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function revealProps(delay: number, reduced: boolean) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: EASE, delay },
  }
}

export default function Schedule() {
  const reduced = useReducedMotion()

  return (
    <section
      id="schedule"
      className="px-5 pt-[8rem] pb-16 sm:pt-32 sm:pb-20 max-w-2xl mx-auto"
      aria-label="Wedding schedule"
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-12"
        {...revealProps(0, reduced ?? false)}
      >
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">
          The Celebrations
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl italic text-text-dark font-light">
          Schedule
        </h2>
      </motion.div>

      {/* Day cards */}
      <div className="flex flex-col gap-5">
        {schedule.map((card, i) => (
          <motion.div
            key={card.day}
            className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm"
            {...revealProps(i * 0.1, reduced ?? false)}
          >
            {/* Card header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-cream-dark border-b border-border">
              <span className="text-2xl" aria-hidden>{card.emoji}</span>
              <div>
                <p className="font-heading text-xl sm:text-2xl font-medium text-text-dark leading-none">
                  {card.date}
                </p>
                <p className="text-xs text-text-light uppercase tracking-widest font-body mt-0.5">
                  {card.weekday}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="px-5 py-5">
              {/* Single-column events */}
              {card.events && (
                <ul className="space-y-3">
                  {card.events.map((ev) => (
                    <li
                      key={ev.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="font-heading text-lg sm:text-xl font-medium text-text-dark">
                        {ev.label}
                      </span>
                      <span className="text-sm text-gold font-body whitespace-nowrap">
                        {ev.time}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Two-column events (Groom / Bride sides) */}
              {card.columns && (
                <div className="grid grid-cols-2 gap-4">
                  {card.columns.map((col) => (
                    <div key={col.side}>
                      <p className="text-xs tracking-[0.15em] uppercase text-text-light font-body mb-2.5 font-medium">
                        {col.side}
                      </p>
                      <ul className="space-y-3">
                        {col.events.map((ev) => (
                          <li key={ev.label}>
                            <p className="font-heading text-base sm:text-lg font-medium text-text-dark leading-tight">
                              {ev.label}
                            </p>
                            <p className="text-xs text-gold font-body mt-0.5">
                              {ev.time}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
