import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Purnima & Anurag – Wedding Celebrations',
  description:
    'Join us to celebrate the wedding of Purnima & Anurag · 28–30 April · Delhi, India',
  openGraph: {
    title: 'Purnima & Anurag – Wedding Celebrations',
    description: '28–30 April · Delhi, India',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-cream text-text-dark font-body">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
