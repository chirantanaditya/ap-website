/** Image credits: Unsplash — illustrative of each place */

export type PlaceCard = {
  title: string
  imageSrc: string
  imageAlt: string
}

export const ICONIC_DELHI: PlaceCard[] = [
  {
    title: 'Qutub Minar',
    // Photo from Dook International’s Qutub Minar guide: https://www.dookinternational.com/blog/qutub-minar/
    imageSrc:
      'https://blog.dookinternational.com/wp-content/uploads/2017/06/a2.jpg',
    imageAlt: 'Qutub Minar minaret at the Qutub Complex, Delhi',
  },
  {
    title: "Humayun's Tomb",
    // Hero image from Indo Tours: https://indotoursadventures.com/blog-details/humayuns-tomb
    imageSrc:
      'https://indotoursadventures.com/public/storage/blogs/0fcbf14e1e95ab4047cc3fb0dce239b0.jpg',
    imageAlt: "Humayun's Tomb and charbagh gardens, Delhi",
  },
  {
    title: 'India Gate',
    // Photo: Rangan Datta — https://rangandatta.wordpress.com/2016/09/21/india-gate-new-delhi/
    imageSrc:
      'https://rangandatta.wordpress.com/wp-content/uploads/2016/09/india-gate-1.jpg',
    imageAlt: 'India Gate on Rajpath (Kingsway), New Delhi',
  },
  {
    title: 'Lotus Temple',
    // Wikimedia Commons — File:Lotus Temple, New Delhi.jpg (CC BY 2.0)
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/4/41/Lotus_Temple%2C_New_Delhi.jpg',
    imageAlt: 'Lotus-shaped marble temple',
  },
  {
    title: 'Akshardham Temple',
    // Wikimedia Commons — File:Akshardham temple, Delhi, India.jpg (use /5/50/… not old /thumb/8/8c/… which 404s)
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Akshardham_temple%2C_Delhi%2C_India.jpg',
    imageAlt: 'Swaminarayan Akshardham temple, Delhi',
  },
  {
    title: 'Sunder Nursery',
    // Reference photo: https://www.facebook.com/photo.php?fbid=967749758897680&set=a.407486484924013&id=100069879955202
    // Facebook does not expose a stable public image URL for embedding. To use that exact image, save it from the
    // post and replace the file at public/discover-delhi/sunder-nursery.jpg (same path). Current file: panorama of
    // Sunder Nursery from Wikimedia Commons (same park) — https://commons.wikimedia.org/wiki/File:Sunder_Nursery_Wide_angle.jpg
    imageSrc: '/discover-delhi/sunder-nursery.jpg',
    imageAlt: 'Sunder Nursery heritage park, lawns and monuments, Delhi',
  },
]

export const ART_CULTURE: PlaceCard[] = [
  {
    title: 'National Gallery of Modern Art',
    // Local: assets/NGMA.png → served from public/
    imageSrc: '/discover-delhi/ngma.png',
    imageAlt:
      'National Gallery of Modern Art, Jaipur House — sandstone facade, dome and Indian flag, New Delhi',
  },
  {
    title: 'DAG (Delhi Art Gallery)',
    // Local: ap-website/assets/DAG.png → served from public/
    imageSrc: '/discover-delhi/dag.png',
    imageAlt: 'DAG Delhi Art Gallery exhibition with visitors viewing framed art',
  },
]

export const EAT_LOCAL = [
  {
    heading: 'Must-Try Dishes',
    items: [
      'Chole Bhature at Kwality Restaurant, Connaught Place',
      'Butter Chicken at Daryaganj, Connaught Place',
      'Kebabs from Jama Masjid (Old Delhi)',
      'Chaats from any local market',
    ],
  },
  {
    heading: 'Cafe & Restaurant Picks',
    items: ['Big Chill', 'Juggernaut (Kailash Colony)', 'Palette Cafe (Dhan Mill)'],
  },
  {
    heading: 'Casual Food Scenes',
    items: ['Humaynpur (for ramen and momos)'],
  },
] as const

export const CAFES_NIGHTLIFE: PlaceCard[] = [
  {
    title: 'Social (Hauz Khas)',
    imageSrc:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Warm cafe interior with seating',
  },
  {
    title: 'Nukkad Cafe & Bar (SDA Market)',
    imageSrc:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Cafe bar atmosphere',
  },
  {
    title: 'Connaught Place',
    imageSrc:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Colonnaded building exterior at dusk',
  },
]

export const SHOP_WANDER: PlaceCard[] = [
  {
    title: 'Lajpat Nagar',
    imageSrc:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Boutique shopping street',
  },
  {
    title: 'Connaught Place',
    // Wikimedia Commons — File:Connaught Place, New Delhi.jpg (CC BY-SA 2.0)
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/e/e4/Connaught_Place%2C_New_Delhi.jpg',
    imageAlt: 'Urban circle and architecture',
  },
]

export const FUN_SEEKERS: PlaceCard[] = [
  {
    title: 'Bowling',
    imageSrc:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Bowling alley lanes',
  },
  {
    title: 'Go Karting',
    imageSrc:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Go-kart on track',
  },
  {
    title: 'Padel at Dirty Good',
    imageSrc:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Outdoor court sport',
  },
]
