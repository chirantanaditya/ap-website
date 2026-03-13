'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Calendar, Heart, Gift, Instagram } from 'lucide-react'
import { useLenis } from 'lenis/react'

const NAV_OFFSET_PX = 128

type NavItem = {
  id: string
  href: string
  label: string
  Icon: typeof Home
  highlight?: boolean
}

const navItems: NavItem[] = [
  { id: 'home', href: '/', label: 'Home', Icon: Home },
  { id: 'schedule', href: '/team-bride#schedule', label: 'Schedule', Icon: Calendar },
  { id: 'registry', href: 'https://withjoy.com/anurag-and-purnima/registry', label: 'Registry', Icon: Gift },
  { id: 'instagram', href: 'https://www.instagram.com/purnimanurag/', label: 'Instagram', Icon: Instagram },
  { id: 'rsvp', href: '/team-bride#rsvp', label: 'RSVP', Icon: Heart, highlight: true },
]

export default function Nav() {
  const pathname = usePathname()
  const lenis = useLenis()
  const isTeamPage = pathname === '/team-bride' || pathname === '/team-groom'

  function getHref(item: NavItem): string {
    if (item.id === 'home') return '/'
    if (item.id === 'schedule') return isTeamPage ? '#schedule' : '/team-bride#schedule'
    if (item.id === 'rsvp') return isTeamPage ? '#rsvp' : '/team-bride#rsvp'
    if (item.id === 'registry' || item.id === 'instagram') return item.href
    return item.href
  }

  function handleHashClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const el = document.querySelector(href) as HTMLElement | null
    if (el && lenis) lenis.scrollTo(el, { offset: -NAV_OFFSET_PX })
    else if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none">
      <nav
        className="pointer-events-auto w-fit flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gold/20 py-2 px-3 sm:px-4"
        aria-label="Main navigation"
      >
        {navItems.map(({ id, href, label, Icon, highlight }) => {
          const to = getHref({ id, href, label, Icon, highlight })
          const isHashOnly = to.startsWith('#')
          const linkClass =
            'flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-4 rounded-full font-body text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 ' +
            (highlight
              ? 'bg-gold text-white hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98]'
              : 'text-text-dark hover:bg-[#FFDDE4] hover:text-maroon active:bg-[#f5d0d8]')

          if (id === 'home') {
            return (
              <Link key={id} href={to} className={linkClass} aria-label={label}>
                <Icon className="shrink-0 w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          }

          if (isHashOnly) {
            return (
              <a
                key={id}
                href={to}
                onClick={(e) => handleHashClick(e, to)}
                className={linkClass}
                aria-label={label}
              >
                <Icon className="shrink-0 w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </a>
            )
          }

          const isExternal = to.startsWith('http')
          if (isExternal) {
            return (
              <a
                key={id}
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label={label}
              >
                <Icon className="shrink-0 w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </a>
            )
          }

          return (
            <a
              key={id}
              href={to}
              className={linkClass}
              aria-label={label}
            >
              <Icon className="shrink-0 w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden />
              <span className="hidden sm:inline">{label}</span>
            </a>
          )
        })}
      </nav>
    </header>
  )
}
