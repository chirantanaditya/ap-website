export default function Footer() {
  return (
    <footer
      className="relative py-16 text-center px-5 border-t border-border overflow-hidden"
      style={{
        backgroundImage: `url('/photos/${encodeURIComponent('WhatsApp Image 2026-03-06 at 10.11.34 PM.jpeg')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-cream/85" aria-hidden />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
        <p className="font-heading text-3xl italic text-text-dark font-light">
          Purnima &amp; Anurag
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-text-mid font-body">
          28–30 April · Delhi, India
        </p>
        <div className="flex items-center gap-3 text-gold opacity-60 w-32">
          <div className="flex-1 h-px bg-gold" />
          <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
          </svg>
          <div className="flex-1 h-px bg-gold" />
        </div>
        <p className="text-xs text-text-mid font-body">
          Made with love · 2025
        </p>
      </div>
    </footer>
  )
}
