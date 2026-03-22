'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import type { ScheduleRow } from '@/data/schedule'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SANGEET_DRESS_CODE_IMAGE = '/sangeet-dress-code.jpeg'
const BARAAT_DRESS_CODE_IMAGE = '/baraat-dress-code.jpeg'

type Props = { rows: ScheduleRow[] }

export default function CelebrationsTable({ rows }: Props) {
  const reduced = useReducedMotion()
  const [dressCodeImage, setDressCodeImage] = useState<string | null>(null)

  return (
    <section
      id="schedule"
      className="px-5 pt-32 pb-16 sm:pt-32 sm:pb-20 max-w-2xl mx-auto"
      aria-label="Wedding schedule"
    >
      <motion.div
        className="text-center mb-12"
        {...(reduced ? {} : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, ease: EASE },
        })}
      >
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">
          The Celebrations
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl italic text-text-dark font-light">
          Schedule
        </h2>
      </motion.div>

      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <motion.article
            key={`${row.date}-${row.event}-${i}`}
            className="relative rounded-xl border border-border bg-white overflow-hidden"
            {...(reduced ? {} : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.15 },
              transition: { duration: 0.5, ease: EASE, delay: i * 0.06 },
            })}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold/60" aria-hidden />
            <div className="pl-5 pr-4 py-4 sm:pl-6 sm:pr-5 sm:py-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-2">
                <span className="text-xs font-body tracking-[0.12em] uppercase text-text-light">
                  {row.date}
                </span>
                <span className="text-xs font-body text-text-light">·</span>
                <span className="text-xs font-body text-text-mid">{row.time}</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-text-dark leading-tight mb-3">
                {row.event}
              </h3>
              <p className="text-sm font-body text-text-mid leading-relaxed">
                {row.venueUrl ? (
                  <a
                    href={row.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-dark font-medium hover:text-text-dark-light transition-colors focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 rounded"
                  >
                    {row.venue}
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  </a>
                ) : (
                  <span>{row.venue}</span>
                )}
              </p>
              {(row.event === 'Sangeet' || row.event === 'Baraat' || row.event === 'Jaimaal') && (
                <p className="text-sm font-body text-text-mid leading-relaxed mt-2">
                  <button
                    type="button"
                    onClick={() => setDressCodeImage(
                      row.event === 'Sangeet' ? SANGEET_DRESS_CODE_IMAGE : BARAAT_DRESS_CODE_IMAGE
                    )}
                    className="inline-flex items-center gap-1.5 text-text-dark font-medium hover:text-text-dark-light transition-colors focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 rounded"
                  >
                    Dress Code
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  </button>
                </p>
              )}
              {row.dressCodeText && (
                <p className="text-sm font-body text-text-mid leading-relaxed mt-2">
                  {row.dressCodeText}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Dress code image modal */}
      {dressCodeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setDressCodeImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Dress code"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDressCodeImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-text-dark focus-visible:outline-2 focus-visible:outline-maroon"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            <div className="relative w-full max-h-[85vh] overflow-auto p-4 pt-14">
              <img
                src={dressCodeImage}
                alt="Dress code"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
