import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import DiscoverDelhi from '@/components/DiscoverDelhi'

export const metadata: Metadata = {
  title: 'Discover Delhi – Purnima & Anurag',
  description:
    'Iconic landmarks, art, food, and nightlife — our curated guide to exploring Delhi during the wedding weekend.',
  openGraph: {
    title: 'Discover Delhi – Purnima & Anurag',
    description: 'Our favourite places to explore in Delhi · April 2026',
    type: 'website',
  },
}

export default function DiscoverDelhiPage() {
  return (
    <main className="min-h-screen bg-cream/90">
      <Nav />
      <DiscoverDelhi />
    </main>
  )
}
