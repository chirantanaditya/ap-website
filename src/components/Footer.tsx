export default function Footer() {
  return (
    <footer className="relative py-16 text-center px-5 border-t border-border overflow-hidden min-h-[280px]">
      {/* Background image - plain img so global bg-cream pattern doesn't apply */}
      <div className="absolute inset-0 z-0">
        <img
          src="/footer-image.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      {/* Overlay for readability - inline style to avoid [class*="bg-cream"] pattern */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4 text-white">
        <p className="font-heading text-3xl italic font-light">
          Purnima &amp; Anurag
        </p>
        <p className="text-xs tracking-[0.2em] uppercase font-body">
          28–30 April · Delhi, India
        </p>
        <div className="flex items-center gap-3 opacity-80 w-32">
          <div className="flex-1 h-px bg-white" />
          <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
          </svg>
          <div className="flex-1 h-px bg-white" />
        </div>
        <p className="text-xs font-body">
          Made with love · 2026
        </p>
      </div>
    </footer>
  )
}
