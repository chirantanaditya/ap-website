'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function TeamChoice() {
  const reduced = useReducedMotion()

  return (
    <section
      id="team"
      className="px-5 py-16 sm:py-20 max-w-lg mx-auto"
      aria-label="Choose your team"
    >
      <motion.div
        className="text-center mb-10"
        {...(reduced ? {} : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, ease: EASE },
        })}
      >
        <h2 className="font-heading text-3xl sm:text-4xl italic text-text-dark font-light mb-2">
          Choose your team!
        </h2>
        <p className="text-sm text-text-mid font-body">
          Pick a side and see the celebrations for you.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        {...(reduced ? {} : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, ease: EASE, delay: 0.1 },
        })}
      >
        <Link
          href="/team-bride"
          className="group flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] rounded-2xl border-2 border-border bg-[#FFDDE4] shadow-sm px-6 py-8 transition-all duration-300 hover:border-maroon hover:shadow-md hover:bg-[#f5d0d8] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
        >
          <Image
            src="/pn-icon.png"
            alt=""
            width={128}
            height={128}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-3 group-hover:scale-110 transition-transform"
            aria-hidden
          />
          <span className="font-heading text-xl sm:text-2xl italic text-text-dark font-medium">
            Team Bride
          </span>
          <span className="text-xs text-text-light font-body mt-1">View schedule & venues</span>
        </Link>

        <Link
          href="/team-groom"
          className="group flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] rounded-2xl border-2 border-border bg-[#FFDDE4] shadow-sm px-6 py-8 transition-all duration-300 hover:border-maroon hover:shadow-md hover:bg-[#f5d0d8] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
        >
          <Image
            src="/ag-icon.png"
            alt=""
            width={128}
            height={128}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-3 group-hover:scale-110 transition-transform"
            aria-hidden
          />
          <span className="font-heading text-xl sm:text-2xl italic text-text-dark font-medium">
            Team Groom
          </span>
          <span className="text-xs text-text-light font-body mt-1">View schedule & venues</span>
        </Link>
      </motion.div>
    </section>
  )
}
