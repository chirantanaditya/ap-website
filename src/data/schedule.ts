export type ScheduleRow = {
  date: string
  event: string
  time: string
  venue: string
  venueUrl?: string
}

const SANGEET_WEDDING_URL = 'https://maps.app.goo.gl/AY1pt43ew5eQ8ejh9?g_st=ic'
const GROOM_HALDI_URL = 'https://maps.app.goo.gl/W2ZacHZtYRvZxZGu8?g_st=ic'

export const BRIDE_SCHEDULE: ScheduleRow[] = [
  { date: '28 April', event: 'Sangeet', time: '7 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '29 April', event: 'Haldi', time: '10 AM Onwards', venue: "Sharma's House, Mehrauli" },
  { date: '29 April', event: 'Mehendi', time: '4 PM Onwards', venue: "Sharma's House, Mehrauli" },
  { date: '30 April', event: 'Varmala', time: '6 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Pheras', time: '8 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
]

export const GROOM_SCHEDULE: ScheduleRow[] = [
  { date: '28 April', event: 'Sangeet', time: '7 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '29 April', event: 'Haldi Soirée', time: '5 PM Onwards', venue: "Venue: Home", venueUrl: GROOM_HALDI_URL },
  { date: '30 April', event: 'Baraat', time: '5 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Varmala', time: '6 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Pheras', time: '8 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '1 May', event: 'Vadhu Grih Pravesh', time: '6 PM', venue: 'Venue: Home', venueUrl: GROOM_HALDI_URL },
]
