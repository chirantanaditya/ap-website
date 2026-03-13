import Hero from '@/components/Hero'
import TeamChoice from '@/components/TeamChoice'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream/90">
      <Nav />

      {/* Content — pt clears the floating nav pill */}
      <div className="pt-20 sm:pt-24">
        <Hero />
        <TeamChoice />
      </div>
    </main>
  )
}
