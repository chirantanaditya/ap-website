'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { CardCarousel, TextCoverflowCarousel } from '@/components/ui/card-carousel'
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

function placeCardsToCarouselImages(cards: PlaceCard[]) {
  return cards.map((c) => ({ src: c.imageSrc, alt: c.imageAlt, title: c.title }))
}

function DiscoverCarouselSection({
  sectionId,
  title,
  subtext,
  ariaLabel,
  cards,
  reduced,
  autoplayDelay = 2500,
}: {
  sectionId: string
  title: string
  subtext: string
  ariaLabel: string
  cards: PlaceCard[]
  reduced: boolean
  autoplayDelay?: number
}) {
  return (
    <section aria-labelledby={sectionId}>
      <SectionHeading id={sectionId} title={title} subtext={subtext} reduced={reduced} />
      {reduced ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card, i) => (
            <PlaceCardItem
              key={`${sectionId}-${card.title}-${i}`}
              card={card}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-6 w-screen max-w-none ml-[calc(-50vw+50%)]"
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          {...revealProps(0.05, reduced)}
        >
          <CardCarousel images={placeCardsToCarouselImages(cards)} autoplayDelay={autoplayDelay} />
        </motion.div>
      )}
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
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-text-dark/25 via-transparent to-transparent opacity-60 pointer-events-none"
          aria-hidden
        />
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-heading text-lg sm:text-xl font-medium text-text-dark leading-snug">{card.title}</h3>
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
        <DiscoverCarouselSection
          sectionId="iconic-delhi-heading"
          title="Iconic Delhi"
          subtext="If it’s your first time in Delhi, don’t miss these."
          ariaLabel="Iconic Delhi landmarks"
          cards={ICONIC_DELHI}
          reduced={reduced ?? false}
          autoplayDelay={2500}
        />

        <DiscoverCarouselSection
          sectionId="art-culture-heading"
          title="Art & Culture"
          subtext="For slower, more thoughtful moments."
          ariaLabel="Art and culture in Delhi"
          cards={ART_CULTURE}
          reduced={reduced ?? false}
          autoplayDelay={2600}
        />

        {/* Eat like a local — text slides in same coverflow */}
        <section aria-labelledby="eat-local-heading">
          <SectionHeading
            id="eat-local-heading"
            title="Eat Like a Local"
            subtext="Delhi is a food city — come hungry."
            reduced={reduced ?? false}
          />
          {reduced ? (
            <motion.div
              className="max-w-3xl mx-auto rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-sm px-6 py-8 sm:px-10 sm:py-10 space-y-10"
              {...revealProps(0.05, reduced ?? false)}
            >
              {EAT_LOCAL.map((group) => (
                <div key={group.heading}>
                  <h3 className="font-heading text-xl font-medium text-text-dark mb-4 pb-2 border-b border-border/80">
                    {group.heading}
                  </h3>
                  <ul className="space-y-3 font-body text-sm sm:text-base text-text-mid leading-relaxed">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-gold shrink-0 mt-1.5" aria-hidden>
                          ◆
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="mt-6 w-screen max-w-none ml-[calc(-50vw+50%)]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Eat like a local"
              {...revealProps(0.05, reduced ?? false)}
            >
              <TextCoverflowCarousel
                slides={EAT_LOCAL.map((g) => ({
                  heading: g.heading,
                  items: [...g.items],
                }))}
                autoplayDelay={2700}
              />
            </motion.div>
          )}
        </section>

        <DiscoverCarouselSection
          sectionId="cafes-heading"
          title="Cafes & Nightlife"
          subtext="For when the celebrations continue…"
          ariaLabel="Cafes and nightlife"
          cards={CAFES_NIGHTLIFE}
          reduced={reduced ?? false}
          autoplayDelay={2800}
        />

        <DiscoverCarouselSection
          sectionId="shop-heading"
          title="Shop & Wander"
          subtext="Take a little bit of Delhi back with you."
          ariaLabel="Shopping in Delhi"
          cards={SHOP_WANDER}
          reduced={reduced ?? false}
          autoplayDelay={2900}
        />

        <DiscoverCarouselSection
          sectionId="fun-heading"
          title="For the Fun Seekers"
          subtext="If you’ve got extra time (or energy after the wedding)"
          ariaLabel="Fun activities in Delhi"
          cards={FUN_SEEKERS}
          reduced={reduced ?? false}
          autoplayDelay={3000}
        />
      </div>
    </div>
  )
}
