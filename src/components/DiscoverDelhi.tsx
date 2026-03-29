'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import type { PlaceCard } from '@/data/discover-delhi'
import {
  ICONIC_DELHI,
  ART_CULTURE,
  EAT_LOCAL,
  CAFES_NIGHTLIFE,
  SHOP_WANDER,
  FUN_SEEKERS,
} from '@/data/discover-delhi'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function revealProps(delay: number, reduced: boolean) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.65, ease: EASE, delay },
  }
}

function SectionHeading({
  id,
  eyebrow,
  title,
  subtext,
  reduced,
  delay = 0,
}: {
  id?: string
  eyebrow?: string
  title: string
  subtext: string
  reduced: boolean
  delay?: number
}) {
  return (
    <motion.div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14" {...revealProps(delay, reduced)}>
      {eyebrow && (
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="font-heading text-3xl sm:text-4xl italic text-text-dark font-light mb-4"
      >
        {title}
      </h2>
      <p className="text-sm sm:text-base text-text-mid font-body leading-relaxed">{subtext}</p>
    </motion.div>
  )
}

function DiscoverPlaceListSection({
  sectionId,
  title,
  subtext,
  cards,
  reduced,
}: {
  sectionId: string
  title: string
  subtext: string
  cards: PlaceCard[]
  reduced: boolean
}) {
  return (
    <section aria-labelledby={sectionId}>
      <SectionHeading id={sectionId} title={title} subtext={subtext} reduced={reduced} />
      <motion.ul
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0 m-0"
        {...revealProps(0.05, reduced)}
      >
        {cards.map((card, i) => (
          <li key={`${sectionId}-${card.title}-${i}`} className="min-w-0">
            <PlaceCardItem card={card} index={i} reduced={reduced} />
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

function PlaceCardItem({ card, index, reduced }: { card: PlaceCard; index: number; reduced: boolean }) {
  return (
    <motion.article
      className="group rounded-2xl border border-border bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-gold/30"
      {...revealProps(index * 0.05, reduced)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {card.imageHoverSrc ? (
            <Image
              src={card.imageHoverSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none"
              aria-hidden
            />
          ) : null}
        </div>
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-text-dark/25 via-transparent to-transparent opacity-60 pointer-events-none"
          aria-hidden
        />
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-heading text-lg sm:text-xl font-medium text-text-dark leading-snug">{card.title}</h3>
        {card.subtitle ? (
          <p className="mt-1.5 text-xs sm:text-sm font-body text-text-mid leading-snug">{card.subtitle}</p>
        ) : null}
      </div>
    </motion.article>
  )
}

export default function DiscoverDelhi() {
  const reduced = useReducedMotion()

  return (
    <div className="pb-20 sm:pb-28">
      {/* Hero */}
      <section
        className="relative px-5 pt-28 pb-16 sm:pt-36 sm:pb-24 max-w-4xl mx-auto text-center overflow-hidden"
        aria-label="Discover Delhi"
      >
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 45%),
              radial-gradient(circle at 80% 60%, #2d5a3d 0%, transparent 40%)`,
          }}
          aria-hidden
        />
        <motion.div {...revealProps(0, reduced ?? false)}>
          <p className="text-xs tracking-[0.28em] uppercase text-gold font-body mb-4">Delhi, India</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl italic text-text-dark font-light mb-6 leading-tight">
            Discover Delhi
          </h1>
          <p className="text-base sm:text-lg text-text-mid font-body max-w-xl mx-auto leading-relaxed">
            A city of history, food, chaos, and charm — here are some of our favourite things to explore while
            you&apos;re here.
          </p>
          <div className="flex justify-center mt-10 gap-2 opacity-40" aria-hidden>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="w-1 h-1 rounded-full bg-maroon/60" />
            <span className="w-1 h-1 rounded-full bg-emerald-800/40" />
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-5 space-y-20 sm:space-y-28">
        <DiscoverPlaceListSection
          sectionId="iconic-delhi-heading"
          title="Iconic Delhi"
          subtext="If it’s your first time in Delhi, don’t miss these."
          cards={ICONIC_DELHI}
          reduced={reduced ?? false}
        />

        <DiscoverPlaceListSection
          sectionId="art-culture-heading"
          title="Art & Culture"
          subtext="For slower, more thoughtful moments."
          cards={ART_CULTURE}
          reduced={reduced ?? false}
        />

        <section aria-labelledby="eat-local-heading">
          <SectionHeading
            id="eat-local-heading"
            title="Eat Like a Local"
            subtext="Delhi is a food city — come hungry. When the celebrations continue, a few cafes and neighbourhoods we love."
            reduced={reduced ?? false}
          />
          <motion.div
            className="mt-6 space-y-14 sm:space-y-16"
            {...revealProps(0.05, reduced ?? false)}
          >
            {EAT_LOCAL.map((group, gi) => (
              <div key={group.heading}>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-text-dark mb-6 sm:mb-8 pb-3 border-b border-border/80 text-center sm:text-left">
                  {group.heading}
                </h3>
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0 m-0"
                  aria-label={group.heading}
                >
                  {group.cards.map((card, i) => (
                    <li key={`eat-${group.heading}-${card.title}-${i}`} className="min-w-0">
                      <PlaceCardItem
                        card={card}
                        index={gi * 6 + i}
                        reduced={reduced ?? false}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <div className="mt-14 sm:mt-16">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
              {...revealProps(0.08, reduced ?? false)}
            >
              <h3
                id="cafes-nightlife-heading"
                className="font-heading text-2xl sm:text-3xl italic text-text-dark font-light mb-3"
              >
                Cafes &amp; Nightlife
              </h3>
              <p className="text-sm sm:text-base text-text-mid font-body leading-relaxed">
                For when the celebrations continue…
              </p>
            </motion.div>
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0 m-0"
              aria-labelledby="cafes-nightlife-heading"
              {...revealProps(0.1, reduced ?? false)}
            >
              {CAFES_NIGHTLIFE.map((card, i) => (
                <li key={`cafes-${card.title}-${i}`} className="min-w-0">
                  <PlaceCardItem card={card} index={i} reduced={reduced ?? false} />
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        <DiscoverPlaceListSection
          sectionId="shop-heading"
          title="Shop & Wander"
          subtext="Take a little bit of Delhi back with you."
          cards={SHOP_WANDER}
          reduced={reduced ?? false}
        />

        <DiscoverPlaceListSection
          sectionId="fun-heading"
          title="For the Fun Seekers"
          subtext="If you’ve got extra time (or energy after the wedding)"
          cards={FUN_SEEKERS}
          reduced={reduced ?? false}
        />
      </div>
    </div>
  )
}
