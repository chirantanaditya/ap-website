/** Image credits: Unsplash — illustrative of each place */

export type PlaceCard = {
  title: string
  /** Optional line under the title (smaller type in the UI) */
  subtitle?: string
  imageSrc: string
  imageAlt: string
  /** Optional second image shown on card hover (cross-fade over imageSrc) */
  imageHoverSrc?: string
}

export const ICONIC_DELHI: PlaceCard[] = [
  {
    title: 'Qutub Minar',
    subtitle: 'For vibey evening walks',
    // Photo from Dook International’s Qutub Minar guide: https://www.dookinternational.com/blog/qutub-minar/
    imageSrc:
      'https://blog.dookinternational.com/wp-content/uploads/2017/06/a2.jpg',
    imageAlt: 'Qutub Minar minaret at the Qutub Complex, Delhi',
  },
  {
    title: "Humayun's Tomb",
    subtitle: "Shah Jahan's inspo for the Taj Mahal",
    // Hero image from Indo Tours: https://indotoursadventures.com/blog-details/humayuns-tomb
    imageSrc:
      'https://indotoursadventures.com/public/storage/blogs/0fcbf14e1e95ab4047cc3fb0dce239b0.jpg',
    imageAlt: "Humayun's Tomb and charbagh gardens, Delhi",
  },
  {
    title: 'India Gate',
    subtitle: 'Nothing beats the morning energy here',
    // Photo: Rangan Datta — https://rangandatta.wordpress.com/2016/09/21/india-gate-new-delhi/
    imageSrc:
      'https://rangandatta.wordpress.com/wp-content/uploads/2016/09/india-gate-1.jpg',
    imageAlt: 'India Gate on Rajpath (Kingsway), New Delhi',
  },
  {
    title: 'Lotus Temple',
    subtitle: 'The quiet in the middle of the city',
    // Pixabay — https://pixabay.com/photos/temple-delhi-india-architecture-93446/
    imageSrc: 'https://cdn.pixabay.com/photo/2013/03/14/05/55/temple-93446_640.jpg',
    imageAlt: "Lotus Temple (Bahá'í House of Worship), lotus-shaped marble architecture, New Delhi",
  },
  {
    title: 'Akshardham Temple',
    subtitle: 'The scale of the temple is something you have to see to believe',
    // Temple Walks — https://www.templewalks.com/
    imageSrc:
      'https://www.templewalks.com/wp-content/uploads/2025/06/Swaminarayan-temple--1024x576.png',
    imageAlt: 'Swaminarayan Akshardham temple, ornate sandstone architecture',
  },
  {
    title: 'Red Fort',
    subtitle: 'Go for the history, stay for the light & sound show',
    // Incredible India / Adobe Scene7 — red-fort-delhi-attr-hero
    imageSrc:
      'https://s7ap1.scene7.com/is/image/incredibleindia/red-fort-delhi-attr-hero?qlt=82&ts=1742170556347',
    imageAlt: 'Red Fort (Lal Qila), sandstone fort walls and Delhi skyline',
  },
]

export const ART_CULTURE: PlaceCard[] = [
  {
    title: 'National Gallery of Modern Art',
    subtitle: 'Strokes of genius',
    // Reddit (i.redd.it) — saved to public/discover-delhi/ngma.jpg for reliable loading
    imageSrc: '/discover-delhi/ngma.jpg',
    imageAlt:
      'National Gallery of Modern Art, Jaipur House — sandstone facade, dome and Indian flag, New Delhi',
  },
  {
    title: 'DAG (Delhi Art Gallery)',
    subtitle: '150 years of the Indian landscape, framed',
    // Local: ap-website/assets/DAG.png → served from public/
    imageSrc: '/discover-delhi/dag.png',
    imageAlt: 'DAG Delhi Art Gallery exhibition with visitors viewing framed art',
  },
  {
    title: 'National Crafts Museum & Hastkala Academy',
    subtitle: 'Art on the walls, magic on the plate',
    // Source: The Citizen — saved to public for reliable loading (hotlink/CDN can block optimizers)
    imageSrc: '/discover-delhi/crafts-museum.webp',
    imageAlt: 'National Crafts Museum (National Handicrafts and Handlooms Museum), New Delhi',
  },
]

export type EatLocalGroup = {
  heading: string
  cards: PlaceCard[]
}

/** Grouped like the page layout; images Unsplash — illustrative of each dish or vibe */
export const EAT_LOCAL: EatLocalGroup[] = [
  {
    heading: 'Must-Try Dishes',
    cards: [
      {
        title: 'Chole Bhature',
        subtitle: 'Kwality Restaurant, Connaught Place',
        // Zomato CDN — Kwality / chole bhature; hover: TripAdvisor
        imageSrc:
          'https://b.zmtcdn.com/data/pictures/1/121/8b3ad391f5c98f9d878845f70582e43d.jpg?fit=around|750:500&crop=750:500;*,*',
        imageHoverSrc:
          'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/c6/af/b8/chana-bhatura.jpg',
        imageAlt: 'Chole bhature — spiced chickpea curry with fried bread on a plate',
      },
      {
        title: 'Butter Chicken',
        subtitle: 'Daryaganj, Connaught Place',
        // Daryaganj restaurant — https://www.daryaganj.com/
        imageSrc: 'https://www.daryaganj.com/daryaganj-assets/location-images/image-2.jpg',
        imageHoverSrc:
          'https://www.daryaganj.com/daryaganj-assets/iconic-dishes/image-1.jpg',
        imageAlt: 'Butter chicken curry in a bowl with naan bread',
      },
      {
        title: 'Kebabs from Jama Masjid',
        subtitle: 'Old Delhi',
        // Wikimedia — Jama Masjid; hover: Google thumbnail (kebabs)
        imageSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jama_Masjid_-_In_the_Noon.jpg/1280px-Jama_Masjid_-_In_the_Noon.jpg',
        imageHoverSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8NVPT9QOeQLdL4QdyPUPNbe76DcDDEQxvQ&s',
        imageAlt: 'Jama Masjid mosque courtyard and minarets, Old Delhi',
      },
      {
        title: 'Chaats',
        subtitle: 'From any local market',
        // Cook With Manali — papdi chaat; hover: Times of India
        imageSrc:
          'https://www.cookwithmanali.com/wp-content/uploads/2022/03/Papdi-Chaat.jpg',
        imageHoverSrc:
          'https://static.toiimg.com/thumb/msid-40911995,width=1200,height=900/40911995.jpg',
        imageAlt: 'Papdi chaat — crispy wafers, yogurt, chutneys, and toppings',
      },
    ],
  },
  {
    heading: 'Cafe & Restaurant Picks',
    cards: [
      {
        title: 'Big Chill',
        subtitle: 'Cakes, pasta, and Delhi institution energy',
        // LinkedIn article cover (Big Chill)
        imageSrc:
          'https://media.licdn.com/dms/image/v2/D5612AQEq_09764iQTA/article-cover_image-shrink_720_1280/B56Zau8EKqGUAI-/0/1746691714648?e=2147483647&v=beta&t=8z9Zt5HZhIp34dyVvAFzEnOM0hLe7RnPyxXB6XPiyIs',
        imageAlt: 'Big Chill cafe — desserts and interior',
      },
      {
        title: 'Juggernaut',
        subtitle: 'Kailash Colony',
        // Zomato CDN — Juggernaut, Kailash Colony
        imageSrc:
          'https://b.zmtcdn.com/data/pictures/9/18552969/4d2f865cccc7fe0b401701846fa31ff1.jpg',
        imageAlt: 'Juggernaut cafe, Kailash Colony',
      },
      {
        title: 'Palette Cafe',
        subtitle: 'Dhan Mill',
        // Google Places photo — Palette Cafe, Dhan Mill
        imageSrc:
          'https://lh3.googleusercontent.com/places/AJDFj421ppixkQbZTG7toMGNFqXkIfmxrMXonMWT_4__dafInOy-IZGkz_4SRs1zr1sHSrdwagQWb07l1Ut9pEHoUnUjTVUlCpyymVA=s1600-w640',
        imageAlt: 'Palette Cafe, Dhan Mill — cafe interior',
      },
      {
        title: 'Humaynpur',
        subtitle: 'Ramen, momos, and neighbourhood bites',
        // The Lab Mag — Humaynpur feature
        imageSrc:
          'https://www.thelabmagofficial.com/wp-content/uploads/2026/03/New-Website-TLM-Feature-SP-3.png',
        imageAlt: 'Humaynpur — street food and neighbourhood dining, South Delhi',
      },
    ],
  },
]

export const CAFES_NIGHTLIFE: PlaceCard[] = [
  {
    title: 'Social (Hauz Khas)',
    subtitle:
      'Pro tip: Arrive just before sunset to watch the colours change over the water while the music starts to pick up',
    // Swiggy Dineout media
    imageSrc:
      'https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_468/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/7/17/8926f734-0931-4f8f-9dcc-42608ba5f5cd_image42ee189bfbcea745b38b440137a13971f9.JPG',
    imageAlt: 'Social Hauz Khas — cafe and bar interior',
  },
  {
    title: 'Nukkad Cafe & Bar (SDA Market)',
    subtitle: 'The kind of place that makes you want to put your phone away (after the photo)',
    // Zomato CDN
    imageSrc:
      'https://b.zmtcdn.com/data/pictures/2/18375422/787e5085687c34c466e2c2fa9f47364a.jpg?fit=around|960:500&crop=960:500;*,*',
    imageAlt: 'Nukkad Cafe & Bar, SDA Market — cafe and bar atmosphere',
  },
]

export const SHOP_WANDER: PlaceCard[] = [
  {
    title: 'Lajpat Nagar',
    subtitle: 'From raw silk to ready-made: these streets have it all',
    // TripAdvisor CDN (Viator) — attractions media
    imageSrc:
      'https://media.tacdn.com/media/attractions-splice-spp-360x240/06/71/ad/cc.jpg',
    imageAlt: 'Lajpat Nagar market street, shopping and stalls, Delhi',
  },
  {
    title: 'Connaught Place',
    subtitle: 'From high-street fashion to underground treasures: all these in the heart of the city',
    // Times of India / TOI static CDN
    imageSrc:
      'https://static.toiimg.com/thumb/48052467.cms?resizemode=75&width=1200&height=900',
    imageAlt: 'Connaught Place, colonnades and circle, New Delhi',
  },
  {
    title: 'Delhi Haat INA',
    subtitle:
      'From Kashmiri shawls to Madhubani art: travelling across India in just a few steps',
    // Delhi Tourism — https://delhitourism.travel/
    imageSrc:
      'https://delhitourism.travel/images/places-to-visit/headers/dilli-haat-delhi-tourism-entry-fee-timings-holidays-reviews-header.jpg',
    imageAlt: 'Dilli Haat INA — open-air craft bazaar and plaza, South Delhi',
  },
  {
    title: 'Select City Walk',
    subtitle: 'From Zara hauls to Sephora swatches: This mall has it all',
    // Outlook India — Select Citywalk, Saket
    imageSrc:
      'https://imgnew.outlookindia.com/public/uploads/articles/2020/6/2/Select_CITYWALK.jpg',
    imageAlt: 'Select Citywalk mall, Saket — retail and outdoor plaza, South Delhi',
  },
]

export const FUN_SEEKERS: PlaceCard[] = [
  {
    title: 'Picnic at Sundar Nursery',
    // Times of India / TOI static CDN
    imageSrc:
      'https://static.toiimg.com/thumb/71202502.cms?resizemode=75&width=1200&height=900',
    imageAlt: 'Sunder Nursery heritage park, lawns and monuments, Delhi',
  },
  {
    title: 'Bowling at Yes Minister!',
    // Insider.in / Paytm Insider media
    imageSrc:
      'https://media.insider.in/image/upload/w_800/v1756381110/yhcgijdhe1lrzf2pjbo6.png',
    imageAlt: 'Bowling alley lanes',
  },
  {
    title: 'Go Karting at Formula',
    // Formula Karting — https://formulakarting.in/
    imageSrc:
      'https://formulakarting.in/blog/storage/feature-img/blog-1759136502-LPoVnF.webp',
    imageAlt: 'Go-kart on track',
  },
  {
    title: 'Padel at Dirty Good',
    // News Arena India — images.newsarenaindia.com
    imageSrc:
      'https://images.newsarenaindia.com/pickleball-jpg_1762674972221.jpg',
    imageAlt: 'Outdoor court sport',
  },
]
