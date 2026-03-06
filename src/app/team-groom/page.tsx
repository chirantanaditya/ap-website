import Nav from '@/components/Nav'
import CelebrationsTable from '@/components/CelebrationsTable'
import SectionDivider from '@/components/SectionDivider'
import RSVPForm from '@/components/RSVPForm'
import ScrollToHash from '@/components/ScrollToHash'
import { GROOM_SCHEDULE } from '@/data/schedule'

export const metadata = {
  title: 'Team Groom – Purnima & Anurag',
  description: 'Schedule and venues for Team Groom · 28–30 April · Delhi, India',
}

export default function TeamGroomPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <ScrollToHash />
      <div className="pt-20 sm:pt-24">
        <CelebrationsTable rows={GROOM_SCHEDULE} />
        <SectionDivider />
        <RSVPForm />
      </div>
    </main>
  )
}
