export default function SectionDivider() {
  return (
    <div className="flex items-center gap-3 px-5 text-gold opacity-60 max-w-2xl mx-auto" aria-hidden>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
      </svg>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}
