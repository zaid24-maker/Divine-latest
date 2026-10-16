import { slugify } from "@/lib/slug";
import { CONTACTS } from "./agents";
import { PROPERTY_TYPE_LABEL } from "./constants";
import { LOCATIONS } from "./locations";


const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=75`;

const POOLS = {
  apartment: [
    "1545324418-cc1a3fa10c00",
    "1502672260266-1c1ef2d93688",
    "1493809842364-78817add7ffb",
    "1560448204-e02f11c3d0e2",
    "1522708323590-d24dbb6b0267",
    "1600607687939-ce8a6c25118c",
  ],
  house: [
    "1564013799919-ab600027ffc6",
    "1600596542815-ffad4c1539a9",
    "1512917774080-9991f1c4c750",
    "1600585154340-be6161a56a0c",
    "1613490493576-7fde63acd811",
    "1580587771525-78b9dba3b914",
  ],
  office: [
    "1497366216548-37526070297c",
    "1497366811353-6870744d04b2",
    "1486406146926-c627a92ad1ab",
    "1556761175-5973dc0f32e7",
    "1504384308090-c894fdcc538d",
  ],
  retail: [
    "1441986300917-64674bd600d8",
    "1604719312566-8912e9227c6a",
    "1441984904996-e0b6ba687e04",
  ],
  warehouse: [
    "1553413077-190dd305871c",
    "1586528116311-ad8dd3c8310d",
    "1565891741441-64926e441838",
  ],
  land: [
    "1500382017468-9049fed747ef",
    "1506744038136-46273834b3fb",
    "1464822759023-fed622ff2c3b",
  ],
  hotel: [
    "1566073771259-6a8506099945",
    "1551882547-ff40c63fe5fa",
    "1542314831-068cd1dbfeeb",
  ],
  restaurant: [
    "1517248135467-4c7edcad34c6",
    "1414235077428-338989a2e8c0",
    "1552566626-52f8b828add9",
  ],
};

function poolFor(type) {
  switch (type) {
    case "apartment":
    case "studio":
    case "penthouse":
      return POOLS.apartment;
    case "villa":
    case "townhouse":
    case "farmhouse":
    case "duplex":
      return POOLS.house;
    case "land":
    case "commercial-land":
      return POOLS.land;
    case "retail-shop":
    case "showroom":
      return POOLS.retail;
    case "warehouse":
    case "industrial":
      return POOLS.warehouse;
    case "hotel":
      return POOLS.hotel;
    case "restaurant":
      return POOLS.restaurant;
    default:
      return POOLS.office;
  }
}

function imagesFor(type, title, seed) {
  const pool = poolFor(type);
  return Array.from({ length: 5 }, (_, k) => ({
    url: photo(pool[(seed + k) % pool.length]),
    alt: `${title} - photo ${k + 1}`,
  }));
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const AMENITY_ROTATION = [
  "parking",
  "lift",
  "security",
  "gym",
  "pool",
  "clubhouse",
  "cctv",
  "play-area",
  "garden",
  "balcony",
  "beach-access",
  "mosque",
];

function pickAmenities(seed, total, always = []) {
  const picked = new Set(always);
  let k = 0;
  while (picked.size < Math.min(total, AMENITY_ROTATION.length)) {
    picked.add(AMENITY_ROTATION[(seed * 3 + k) % AMENITY_ROTATION.length]);
    k += 1;
  }
  return Array.from(picked);
}

const FACINGS = ["North", "East", "South", "West", "North-East", "South-East"];
const DAY_MS = 86_400_000;
const BASE_DATE = Date.UTC(2026, 8, 30);

/* Bayut-style payment extras, merged per listing.                     */
/* `paymentPlan` follows the Gulf off-plan convention: a headline       */
/* down payment / during-construction / on-handover split.              */
/* `serviceCharge` is the annual service fee per sq ft quoted by the    */
/* community (AED 18/sqft in Dubai Marina, OMR 0.55/sqft in Qurum...).  */
const PAYMENT_EXTRAS = {
  "Marina-View 2 Bedroom Apartment": {
    paymentMethods: ["cash", "mortgage", "bank-finance"],
    serviceCharge: { amount: 18, per: "sqft", period: "year" },
  },
  "Investor-Ready 1 Bedroom in Dubai Marina": {
    paymentMethods: ["cash", "mortgage"],
    serviceCharge: { amount: 16, per: "sqft", period: "year" },
  },
  "Downtown 2 Bedroom with Burj Views": {
    paymentMethods: ["cash", "mortgage", "bank-finance"],
    serviceCharge: { amount: 22, per: "sqft", period: "year" },
  },
  "3 Bedroom Townhouse in Family Community": {
    paymentPlan: { downPayment: 20, duringConstruction: 50, onHandover: 30 },
    paymentMethods: ["cash", "bank-finance"],
  },
  "Beachfront Villa on Saadiyat Island": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 3.8, per: "sqft", period: "year" },
  },
  "Family Villa Steps from Yas Mall": {
    paymentMethods: ["cash", "mortgage"],
    serviceCharge: { amount: 3.2, per: "sqft", period: "year" },
  },
  "Al Majaz 3 Bedroom with Khalid Lagoon Views": {
    paymentMethods: ["cash", "mortgage"],
    serviceCharge: { amount: 10, per: "sqft", period: "year" },
  },
  "3 Bedroom Apartment in Olaya": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 14, per: "sqft", period: "year" },
  },
  "Modern Family Villa in Hittin": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 9, per: "sqft", period: "year" },
  },
  "4 Bedroom Townhouse in Al Malqa": {
    paymentPlan: { downPayment: 10, duringConstruction: 40, onHandover: 50 },
    paymentMethods: ["cash", "bank-finance"],
  },
  "Private Villa with Garden in Al Rawdah": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 8, per: "sqft", period: "year" },
  },
  "Standalone Villa in West Bay Doha": {
    paymentMethods: ["cash", "mortgage", "bank-finance"],
    serviceCharge: { amount: 20, per: "sqft", period: "year" },
  },
  "Apartment Facing Lusail Lagoon": {
    paymentMethods: ["cash", "mortgage"],
    serviceCharge: { amount: 24, per: "sqft", period: "year" },
  },
  "1 Bedroom with Marina Views on The Pearl": {
    paymentMethods: ["cash", "mortgage"],
    serviceCharge: { amount: 26, per: "sqft", period: "year" },
  },
  "3 Bedroom Apartment in Sharq": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 1.1, per: "sqft", period: "year" },
  },
  "Family Villa in Salmiya": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 0.9, per: "sqft", period: "year" },
  },
  "Villa with Private Pool in Qurum": {
    paymentMethods: ["cash", "bank-finance"],
    serviceCharge: { amount: 0.55, per: "sqft", period: "year" },
  },
  "2 Bedroom Apartment on Seef": {
    paymentMethods: ["cash", "mortgage", "bank-finance"],
    serviceCharge: { amount: 1.4, per: "sqft", period: "year" },
  },
};

function describe(title, type, key, purpose, extra) {
  const l = LOCATIONS[key];
  const intent =
    purpose === "sale" ? "available for purchase" : "available for rent";
  return [
    `${title} is ${intent} in ${l.locality}, ${l.city}. ${extra}`,
    `This ${PROPERTY_TYPE_LABEL[type].toLowerCase()} sits in one of ${l.city}'s most in-demand pockets, with dependable daily-needs retail, schools and public transport close by. All documents are available for review and a site visit can be scheduled any day of the week.`,
    `Contact the listing professional on Divine Bricks to arrange a visit, request the floor plan or ask about price flexibility.`,
  ].join("\n\n");
}

/* ------------------------------------------------------------------ */
/* Residential                                                         */
/* ------------------------------------------------------------------ */

const RESIDENTIAL_SEEDS = [
  [
    "Marina-View 2 Bedroom Apartment",
    "sale",
    "apartment",
    2_600_000,
    2,
    3,
    1320,
    "dubai-marina",
    "furnished",
    "ready",
    "FVR",
    0,
  ],
  [
    "Investor-Ready 1 Bedroom in Dubai Marina",
    "sale",
    "apartment",
    1_750_000,
    1,
    2,
    810,
    "dubai-marina",
    "unfurnished",
    "ready",
    "VR",
    1,
  ],
  [
    "Bright Studio Steps from Marina Walk",
    "rent",
    "studio",
    6_500,
    0,
    1,
    520,
    "dubai-marina",
    "furnished",
    "ready",
    "NO",
    10,
  ],
  [
    "Downtown 2 Bedroom with Burj Views",
    "sale",
    "apartment",
    3_250_000,
    2,
    3,
    1410,
    "dubai-downtown",
    "semi-furnished",
    "ready",
    "VFP",
    1,
  ],
  [
    "Furnished 1 Bedroom near Dubai Mall",
    "rent",
    "apartment",
    8_500,
    1,
    2,
    760,
    "dubai-downtown",
    "furnished",
    "ready",
    "V",
    0,
  ],
  [
    "3 Bedroom Townhouse in Family Community",
    "sale",
    "townhouse",
    2_250_000,
    3,
    4,
    2250,
    "dubai-jvc",
    "unfurnished",
    "under-construction",
    "VRN",
    1,
  ],
  [
    "Beachfront Villa on Saadiyat Island",
    "sale",
    "villa",
    7_500_000,
    5,
    6,
    5200,
    "abu-dhabi-saadiyat",
    "semi-furnished",
    "ready",
    "FVP",
    2,
  ],
  [
    "Golf-Facing Apartment on Saadiyat",
    "rent",
    "apartment",
    7_800,
    2,
    2,
    1080,
    "abu-dhabi-saadiyat",
    "furnished",
    "ready",
    "V",
    2,
  ],
  [
    "Family Villa Steps from Yas Mall",
    "sale",
    "villa",
    5_900_000,
    4,
    5,
    3900,
    "abu-dhabi-yas",
    "unfurnished",
    "ready",
    "VR",
    2,
  ],
  [
    "Al Majaz 3 Bedroom with Khalid Lagoon Views",
    "sale",
    "apartment",
    1_350_000,
    3,
    3,
    1580,
    "sharjah-al-majaz",
    "semi-furnished",
    "ready",
    "VR",
    3,
  ],
  [
    "Family 2 Bedroom Near Al Majaz Waterfront",
    "rent",
    "apartment",
    4_200,
    2,
    2,
    1150,
    "sharjah-al-majaz",
    "unfurnished",
    "ready",
    "V",
    3,
  ],
  [
    "3 Bedroom Apartment in Olaya",
    "sale",
    "apartment",
    2_100_000,
    3,
    3,
    1720,
    "riyadh-olaya",
    "semi-furnished",
    "ready",
    "VR",
    4,
  ],
  [
    "Modern Family Villa in Hittin",
    "sale",
    "villa",
    4_800_000,
    5,
    6,
    4400,
    "riyadh-hittin",
    "furnished",
    "ready",
    "FVP",
    4,
  ],
  [
    "4 Bedroom Townhouse in Al Malqa",
    "sale",
    "townhouse",
    2_950_000,
    4,
    5,
    3100,
    "riyadh-al-malqa",
    "unfurnished",
    "under-construction",
    "NR",
    11,
  ],
  [
    "Private Villa with Garden in Al Rawdah",
    "sale",
    "villa",
    3_400_000,
    4,
    5,
    3600,
    "jeddah-al-rawdah",
    "semi-furnished",
    "ready",
    "VR",
    5,
  ],
  [
    "Sea-View 2 Bedroom on Ash Shati",
    "rent",
    "apartment",
    5_200,
    2,
    2,
    1120,
    "jeddah-ash-shati",
    "furnished",
    "ready",
    "V",
    5,
  ],
  [
    "Standalone Villa in West Bay Doha",
    "sale",
    "villa",
    6_500_000,
    5,
    6,
    4800,
    "doha-west-bay",
    "furnished",
    "ready",
    "FVP",
    6,
  ],
  [
    "Apartment Facing Lusail Lagoon",
    "sale",
    "apartment",
    2_850_000,
    3,
    4,
    1900,
    "doha-lusail",
    "semi-furnished",
    "ready",
    "VR",
    6,
  ],
  [
    "1 Bedroom with Marina Views on The Pearl",
    "sale",
    "apartment",
    1_950_000,
    1,
    2,
    890,
    "doha-the-pearl",
    "furnished",
    "ready",
    "VN",
    12,
  ],
  [
    "3 Bedroom Apartment in Sharq",
    "sale",
    "apartment",
    320_000,
    3,
    3,
    1750,
    "kuwait-city-sharq",
    "semi-furnished",
    "ready",
    "VR",
    7,
  ],
  [
    "Family Villa in Salmiya",
    "sale",
    "villa",
    480_000,
    4,
    4,
    2900,
    "kuwait-city-salmiya",
    "unfurnished",
    "ready",
    "V",
    7,
  ],
  [
    "Villa with Private Pool in Qurum",
    "sale",
    "villa",
    285_000,
    4,
    4,
    3100,
    "muscat-qurum",
    "semi-furnished",
    "ready",
    "VR",
    8,
  ],
  [
    "2 Bedroom Apartment on Seef",
    "sale",
    "apartment",
    145_000,
    2,
    2,
    1250,
    "manama-seef",
    "semi-furnished",
    "ready",
    "VR",
    9,
  ],
];

let counter = 0;
const nextId = () => `PROP-${String(++counter).padStart(3, "0")}`;

function residential(
  [
    title,
    purpose,
    type,
    price,
    beds,
    baths,
    area,
    key,
    furnishing,
    possession,
    flags,
    contact,
  ],
  i,
) {
  const l = LOCATIONS[key];
  const isLandOrHouse =
    type === "land" ||
    type === "villa" ||
    type === "townhouse" ||
    type === "farmhouse";
  const floor = isLandOrHouse ? undefined : ((i * 3) % 18) + 1;
  const bedLabel = beds === 0 ? "" : `${beds} bedroom `;
  return {
    id: nextId(),
    slug: slugify(`${title} ${l.locality} ${l.city}`),
    title,
    description: describe(
      title,
      type,
      key,
      purpose,
      type === "land"
        ? `A build-ready land parcel of ${area.toLocaleString("en-US")} sq ft with road access on two sides and utilities at the boundary.`
        : `A well-planned ${bedLabel}${PROPERTY_TYPE_LABEL[type].toLowerCase()} of ${area.toLocaleString("en-US")} sq ft with bright rooms, good cross-ventilation and quality fittings.`,
    ),
    purpose,
    category: "residential",
    propertyType: type,
    price,
    currency: l.currency,
    bedrooms: beds,
    bathrooms: baths,
    area,
    carpetArea: Math.round(area * 0.82),
    areaUnit: "sqft",
    location: l,
    images: imagesFor(type, title, i),
    amenities:
      type === "land"
        ? ["security", "cctv", "garden"]
        : pickAmenities(i, 6 + (i % 4), ["parking"]),
    agent: CONTACTS[contact],
    furnishing,
    possession,
    parking:
      type === "land" ? 0 : Math.max(1, Math.min(3, Math.round(beds / 2))),
    floor,
    totalFloors: floor ? floor + (i % 10) + 2 : undefined,
    ageYears: possession === "ready" ? (i % 9) + 1 : 0,
    facing: FACINGS[i % FACINGS.length],
    verified: flags.includes("V"),
    featured: flags.includes("F"),
    isNew: flags.includes("N"),
    ownerListed: flags.includes("O"),
    licensed: flags.includes("R"),
    premium: flags.includes("P"),
    status: "active",
    listedAt: new Date(BASE_DATE - i * 2 * DAY_MS).toISOString(),
    views: 300 + ((i * 137) % 2400),
    leads: 4 + ((i * 7) % 38),
    videoUrl: flags.includes("F") ? "video-available" : undefined,
    virtualTourUrl: flags.includes("P") ? "tour-available" : undefined,
    ...(PAYMENT_EXTRAS[title] ?? {}),
  };
}

/* ------------------------------------------------------------------ */
/* Commercial                                                          */
/* ------------------------------------------------------------------ */

const COMMERCIAL_SEEDS = [
  [
    "Downtown Retail Unit on Mohammed Bin Rashid Blvd",
    "sale",
    "retail-shop",
    4_200_000,
    1650,
    "dubai-downtown",
    "unfurnished",
    "ready",
    "VR",
    1,
    0,
    true,
    true,
    2,
    5,
  ],
  [
    "Canal-View Office in Business Bay",
    "rent",
    "office",
    12_500,
    1450,
    "dubai-business-bay",
    "furnished",
    "ready",
    "FVR",
    0,
    21,
    true,
    false,
    2,
    4,
  ],
  [
    "Managed Co-working Floor in Dubai Marina",
    "rent",
    "co-working",
    22_000,
    3200,
    "dubai-marina",
    "furnished",
    "ready",
    "FN",
    0,
    7,
    true,
    false,
    4,
    2,
  ],
  [
    "Showroom on Al Reem Island",
    "sale",
    "showroom",
    3_100_000,
    2600,
    "abu-dhabi-al-reem",
    "unfurnished",
    "ready",
    "VR",
    2,
    0,
    true,
    true,
    3,
    3,
  ],
  [
    "Grade-A Office Floor on Olaya",
    "sale",
    "office",
    3_200_000,
    2900,
    "riyadh-olaya",
    "furnished",
    "ready",
    "FVR",
    4,
    12,
    true,
    false,
    4,
    6,
  ],
  [
    "Retail Space on Tahlia Street",
    "rent",
    "retail-shop",
    14_000,
    1800,
    "riyadh-olaya",
    "unfurnished",
    "ready",
    "V",
    4,
    0,
    true,
    true,
    2,
    8,
  ],
  [
    "Office Tower Floor in West Bay",
    "sale",
    "office",
    4_250_000,
    3050,
    "doha-west-bay",
    "unfurnished",
    "ready",
    "VR",
    6,
    14,
    true,
    false,
    4,
    7,
  ],
  [
    "Retail Unit in Sharq Souq Area",
    "sale",
    "retail-shop",
    250_000,
    950,
    "kuwait-city-sharq",
    "unfurnished",
    "ready",
    "V",
    7,
    0,
    true,
    true,
    1,
    9,
  ],
  [
    "Restaurant Space in Qurum",
    "rent",
    "restaurant",
    1_850,
    1900,
    "muscat-qurum",
    "semi-furnished",
    "ready",
    "VN",
    8,
    1,
    true,
    true,
    2,
    6,
  ],
  [
    "Office Suite on Seef Road",
    "sale",
    "office",
    95_000,
    1100,
    "manama-seef",
    "furnished",
    "ready",
    "VR",
    9,
    5,
    false,
    false,
    2,
    4,
  ],
];

function commercial(
  [
    title,
    purpose,
    type,
    price,
    area,
    key,
    furnishing,
    possession,
    flags,
    contact,
    floor,
    mainRoad,
    corner,
    washrooms,
    ageYears,
  ],
  i,
) {
  const l = LOCATIONS[key];
  return {
    id: nextId(),
    slug: slugify(`${title} ${l.locality} ${l.city}`),
    title,
    description: describe(
      title,
      type,
      key,
      purpose,
      `Approximately ${area.toLocaleString("en-US")} sq ft of ${PROPERTY_TYPE_LABEL[type].toLowerCase()} space with strong visibility, reliable power and easy access for staff, customers and deliveries.`,
    ),
    purpose,
    category: "commercial",
    propertyType: type,
    price,
    currency: l.currency,
    washrooms,
    mainRoad,
    cornerProperty: corner,
    area,
    carpetArea: Math.round(area * 0.78),
    areaUnit: "sqft",
    location: l,
    images: imagesFor(type, title, i),
    amenities: pickAmenities(i + 3, 5, ["parking", "security", "cctv"]),
    agent: CONTACTS[contact],
    furnishing,
    possession,
    parking: Math.max(2, Math.round(area / 900)),
    floor,
    totalFloors: floor !== undefined ? floor + 6 : undefined,
    ageYears,
    facing: FACINGS[(i + 2) % FACINGS.length],
    verified: flags.includes("V"),
    featured: flags.includes("F"),
    isNew: flags.includes("N"),
    ownerListed: flags.includes("O"),
    licensed: flags.includes("R"),
    premium: flags.includes("P"),
    status: "active",
    listedAt: new Date(BASE_DATE - (i * 2 + 1) * DAY_MS).toISOString(),
    views: 200 + ((i * 211) % 1800),
    leads: 3 + ((i * 5) % 25),
    ...(PAYMENT_EXTRAS[title] ?? {}),
  };
}

export const RESIDENTIAL_PROPERTIES = RESIDENTIAL_SEEDS.map(residential);
export const COMMERCIAL_PROPERTIES = COMMERCIAL_SEEDS.map(commercial);
export const PROPERTIES = [...RESIDENTIAL_PROPERTIES, ...COMMERCIAL_PROPERTIES];
