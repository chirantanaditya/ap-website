export type ScheduleRow = {
  date: string
  event: string
  time: string
  venue: string
  venueUrl?: string
  /** Optional line shown at the bottom of the card (e.g. dress code note) */
  dressCodeText?: string
}

const SANGEET_WEDDING_URL = 'https://maps.app.goo.gl/AY1pt43ew5eQ8ejh9?g_st=ic'
const GROOM_HALDI_URL = 'https://maps.app.goo.gl/W2ZacHZtYRvZxZGu8?g_st=ic'
const SHARMAS_HOUSE_URL = 'https://www.google.com/maps?q=28.521366119384766,77.17475128173828&z=17&hl=en'

export const BRIDE_SCHEDULE: ScheduleRow[] = [
  { date: '28 April', event: 'Sangeet', time: '7 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '29 April', event: 'Haldi', time: '4 PM Onwards', venue: "Sharma's House, Mehrauli", venueUrl: SHARMAS_HOUSE_URL },
  { date: '29 April', event: 'Mehendi', time: '6 PM onwards.', venue: "Sharma's House, Mehrauli", venueUrl: SHARMAS_HOUSE_URL },
  { date: '30 April', event: 'Jaimaal', time: '7:04 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Pheras', time: '8 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
]

export const GROOM_SCHEDULE: ScheduleRow[] = [
  { date: '28 April', event: 'Sangeet', time: '7 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  {
    date: '29 April',
    event: 'Haldi Soirée',
    time: '5 PM Onwards',
    venue: 'Venue: Home',
    venueUrl: GROOM_HALDI_URL,
    dressCodeText: 'Dress code: Whatever feels summer to you',
  },
  { date: '30 April', event: 'Baraat', time: '5 PM Onwards', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Jaimaal', time: '7PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '30 April', event: 'Pheras', time: '8 PM', venue: 'Venue: Cherish Ballrooms', venueUrl: SANGEET_WEDDING_URL },
  { date: '1 May', event: 'Vadhu Grih Pravesh', time: '6 PM', venue: 'Venue: Home', venueUrl: GROOM_HALDI_URL },
]
