'use client'

import Image from 'next/image'

const PHOTOS = [
  '2.jpeg',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '11.jpeg',
  '20.jpeg',
  '36.jpeg',
  '44.jpeg',
  '50.jpeg',
  '98.jpeg',
  '100.jpeg',
  'b.jpeg',
  'WhatsApp Image 2026-03-06 at 10.11.34 PM.jpeg',
].map((name) => ({
  src: `/photos/${encodeURIComponent(name)}`,
  alt: 'Wedding celebration',
}))

export default function PhotoCarousel() {
  return (
    <div className="w-full overflow-hidden py-6" aria-hidden>
      <div className="flex animate-carousel gap-4">
        {[...PHOTOS, ...PHOTOS].map((photo, i) => (
          <div
            key={i}
            className="relative h-40 w-56 sm:h-48 sm:w-64 shrink-0 overflow-hidden rounded-xl border border-border shadow-md"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 224px, 256px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
