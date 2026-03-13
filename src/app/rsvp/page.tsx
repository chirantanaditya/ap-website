import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'RSVP – Purnima & Anurag',
  description: 'RSVP for our wedding · 28–30 April · Delhi, India',
}

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-cream/90">
      <Nav />
      <section
        className="px-5 pt-32 pb-20 sm:pt-36 sm:pb-24 max-w-lg mx-auto"
        aria-label="Choose your team to RSVP"
      >
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">
            Kindly respond by 20 April
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl italic text-text-dark font-light mb-3">
            RSVP
          </h1>
          <p className="text-sm text-text-mid font-body max-w-sm mx-auto">
            Which team are you from? We&apos;ll take you to the right form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/team-bride#rsvp"
            className="group flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] rounded-2xl border-2 border-border bg-[#FFDDE4] shadow-sm px-6 py-8 transition-all duration-300 hover:border-maroon hover:shadow-md hover:bg-[#f5d0d8] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
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
            <span className="text-xs text-text-light font-body mt-1">Fill RSVP form</span>
          </Link>

          <Link
            href="/team-groom#rsvp"
            className="group flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] rounded-2xl border-2 border-border bg-[#FFDDE4] shadow-sm px-6 py-8 transition-all duration-300 hover:border-maroon hover:shadow-md hover:bg-[#f5d0d8] focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
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
            <span className="text-xs text-text-light font-body mt-1">Fill RSVP form</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
