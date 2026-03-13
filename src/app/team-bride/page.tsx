import Nav from '@/components/Nav'
import CelebrationsTable from '@/components/CelebrationsTable'
import SectionDivider from '@/components/SectionDivider'
import RSVPForm from '@/components/RSVPForm'
import ScrollToHash from '@/components/ScrollToHash'
import { BRIDE_SCHEDULE } from '@/data/schedule'

export const metadata = {
  title: 'Team Bride – Purnima & Anurag',
  description: 'Schedule and venues for Team Bride · 28–30 April · Delhi, India',
}

export default function TeamBridePage() {
  return (
    <main className="min-h-screen bg-cream/90">
      <Nav />
      <ScrollToHash />
      <div className="pt-20 sm:pt-24">
        <CelebrationsTable rows={BRIDE_SCHEDULE} />
        <SectionDivider />
        <RSVPForm team="bride" />
      </div>
    </main>
  )
}
