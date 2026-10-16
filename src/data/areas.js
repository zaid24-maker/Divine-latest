const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=75`;

export const AREAS = [
  {
    slug: "dubai",
    name: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    tagline: "Waterfront towers, freehold ownership and strong rental yields",
    description:
      "From Dubai Marina's promenade towers to Downtown's Burj-view residences and JVC's value townhouses, Dubai offers the GCC's deepest market with freehold zones open to every nationality and gross yields among the world's best.",
    image: photo("1512453979798-5ea266f8880c"),
    highlights: [
      "Freehold zones for overseas buyers",
      "Metro, tram and waterfront promenades",
      "Deep resale and short-let rental demand",
    ],
    avgPriceSqft: "AED 1,900 / sq ft",
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    state: "Abu Dhabi",
    country: "United Arab Emirates",
    tagline: "Saadiyat culture, Yas leisure and calm island living",
    description:
      "Abu Dhabi pairs museum-grade waterfronts on Saadiyat Island with family villa communities on Yas Island and high-rise living on Al Reem, all in the UAE's spacious, low-rise capital.",
    image: photo("1512632578888-169bbbc64f33"),
    highlights: [
      "Louvre Abu Dhabi and Saadiyat Cultural District",
      "Yas Island theme parks and F1 circuit",
      "Beachfront villa communities",
    ],
    avgPriceSqft: "AED 1,450 / sq ft",
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    state: "Sharjah",
    country: "United Arab Emirates",
    tagline: "Lagoon views and family value minutes from Dubai",
    description:
      "Sharjah delivers the UAE's most accessible family housing around Al Majaz and the Khalid Lagoon, with established schools and a short commute across the Dubai border.",
    image: photo("1486406146926-c627a92ad1ab"),
    highlights: [
      "Al Majaz Waterfront and Khalid Lagoon",
      "Notably lower entry prices than Dubai",
      "Established schools and universities",
    ],
    avgPriceSqft: "AED 750 / sq ft",
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    state: "Riyadh",
    country: "Saudi Arabia",
    tagline: "The Kingdom's capital, building fast on Vision 2030",
    description:
      "Riyadh's northern districts — Hittin, Al Malqa and the Olaya business core — anchor Saudi Arabia's fastest-growing housing market, with new off-plan communities launching every quarter.",
    image: photo("1517935706615-2717063c2225"),
    highlights: [
      "Vision 2030 investment pipeline",
      "Olaya financial and retail core",
      "New villa communities in Hittin & Al Malqa",
    ],
    avgPriceSqft: "SAR 1,600 / sq ft",
  },
  {
    slug: "jeddah",
    name: "Jeddah",
    state: "Makkah",
    country: "Saudi Arabia",
    tagline: "Red Sea corniche living and the Gateway to Makkah",
    description:
      "Jeddah combines restored Al Balad heritage with sea-view apartments along the Corniche and garden villas in Al Rawdah, serving the Kingdom's principal port and gateway city.",
    image: photo("1512917774080-9991f1c4c750"),
    highlights: [
      "Red Sea Corniche and waterfront projects",
      "Historic Al Balad UNESCO quarter",
      "Gateway to Makkah and Madinah",
    ],
    avgPriceSqft: "SAR 950 / sq ft",
  },
  {
    slug: "doha",
    name: "Doha",
    state: "Doha",
    country: "Qatar",
    tagline: "The Pearl, Lusail Lagoon and a skyline of new towers",
    description:
      "Doha concentrates demand in West Bay's office and residential towers, The Pearl's marina islands and Lusail's planned smart-city districts, backed by one of the world's highest incomes per capita.",
    image: photo("1518684079-3c830dcef090"),
    highlights: [
      "The Pearl Qatar marina islands",
      "Lusail smart-city districts",
      "West Bay financial district",
    ],
    avgPriceSqft: "QAR 1,550 / sq ft",
  },
  {
    slug: "kuwait-city",
    name: "Kuwait City",
    state: "Al Asimah",
    country: "Kuwait",
    tagline: "Souq-side apartments and established seaside suburbs",
    description:
      "Kuwait City centres on the Sharq financial district and the historic souqs, with family villas spreading along the coast through Salmiya and beyond.",
    image: photo("1519999482648-25049ddd37b1"),
    highlights: [
      "Sharq financial district and souqs",
      "Arabian Gulf corniche",
      "Established Salmiya suburb",
    ],
    avgPriceSqft: "KWD 310 / sq ft",
  },
  {
    slug: "muscat",
    name: "Muscat",
    state: "Muscat",
    country: "Oman",
    tagline: "Low-rise charm between rugged mountains and the sea",
    description:
      "Muscat keeps its skyline low and its coastline central: Qurum's beach villas, the opera district and marina communities offer a quieter Gulf market with steady demand.",
    image: photo("1519643381401-22c77e60520e"),
    highlights: [
      "Qurum Beach and Royal Opera House",
      "Low-density villa communities",
      "Integrated Tourism Complexes open to buyers",
    ],
    avgPriceSqft: "OMR 210 / sq ft",
  },
  {
    slug: "manama",
    name: "Manama",
    state: "Capital",
    country: "Bahrain",
    tagline: "Seef towers, souq heritage and the Gulf's easiest commute",
    description:
      "Manama's Seef district pairs glass office towers with apartment living minutes from Bahrain's financial harbour, with the region's most accessible entry prices and relaxed lifestyle.",
    image: photo("1545324418-cc1a3fa10c00"),
    highlights: [
      "Seef and Bahrain Financial Harbour",
      "Freehold islands for GCC and overseas buyers",
      "Compact, commutable capital",
    ],
    avgPriceSqft: "BHD 520 / sq ft",
  },
];
