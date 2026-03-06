'use client'

import { Calendar, MapPin, Heart } from 'lucide-react'
import { useLenis } from 'lenis/react'

const NAV_OFFSET_PX = 128

type NavItem = {
  id: string
  href: string
  label: string
  Icon: typeof Calendar
  highlight?: boolean
}

const navItems: NavItem[] = [
  { id: 'schedule', href: '#schedule', label: 'Events', Icon: Calendar },
  { id: 'venues', href: '#venues', label: 'Venues', Icon: MapPin },
  { id: 'rsvp', href: '#rsvp', label: 'RSVP', Icon: Heart, highlight: true },
]

export default function Nav() {
  const lenis = useLenis()

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el && lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET_PX })
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none">
      <nav
        className="pointer-events-auto w-fit flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gold/20 py-2 px-3 sm:px-4"
        aria-label="Main navigation"
      >
        {navItems.map(({ id, href, label, Icon, highlight }) => (
          <a
            key={id}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`
              flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-4 rounded-full font-body text-sm font-medium
              transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2
              ${highlight
                ? 'bg-gold text-white hover:bg-gold-light'
                : 'text-maroon hover:bg-cream-dark'
              }
            `}
            aria-label={label}
          >
            <Icon className="shrink-0 w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
