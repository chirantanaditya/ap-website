import Hero from '@/components/Hero'
import Schedule from '@/components/Schedule'
import Venues from '@/components/Venues'
import RSVPForm from '@/components/RSVPForm'
import Nav from '@/components/Nav'

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 px-5 text-gold opacity-60 max-w-2xl mx-auto" aria-hidden>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-12 text-center px-5 bg-cream border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        <p className="font-heading text-3xl italic text-maroon font-light">
          Purnima &amp; Anurag
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-text-light font-body">
          28–30 April · Delhi, India
        </p>
        <div className="flex items-center gap-3 text-gold opacity-50 w-32">
          <div className="flex-1 h-px bg-gold" />
          <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
          </svg>
          <div className="flex-1 h-px bg-gold" />
        </div>
        <p className="text-xs text-text-light font-body">
          Made with love · 2025
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Content — pt clears the floating nav pill */}
      <div className="pt-20 sm:pt-24">
        <Hero />
        <SectionDivider />
        <Schedule />
        <SectionDivider />
        <Venues />
        <SectionDivider />
        <RSVPForm />
        <Footer />
      </div>
    </main>
  )
}
