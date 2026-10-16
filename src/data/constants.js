export const SITE = {
  name: "Divine Bricks",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.divinebricks.com",
  tagline:
    "A modern property marketplace to discover, buy, rent, sell and list residential and commercial properties across the GCC.",
  phone: "+971 4 555 0100",
  whatsapp: "971555550100",
  email: "hello@divinebricks.com",
  address: "Level 14, Boulevard Plaza Tower 1, Downtown Dubai, UAE",
};

/** Currencies used by listings. `symbol` prefixes every formatted price. */
export const CURRENCIES = {
  AED: { code: "AED", symbol: "AED ", label: "UAE Dirham" },
  SAR: { code: "SAR", symbol: "SAR ", label: "Saudi Riyal" },
  QAR: { code: "QAR", symbol: "QAR ", label: "Qatari Riyal" },
  KWD: { code: "KWD", symbol: "KWD ", label: "Kuwaiti Dinar" },
  OMR: { code: "OMR", symbol: "OMR ", label: "Omani Rial" },
  BHD: { code: "BHD", symbol: "BHD ", label: "Bahraini Dinar" },
};

/** Country -> currency, used by the listing wizard. */
export const COUNTRY_CURRENCY = {
  "United Arab Emirates": "AED",
  "Saudi Arabia": "SAR",
  Qatar: "QAR",
  Kuwait: "KWD",
  Oman: "OMR",
  Bahrain: "BHD",
};

export const COUNTRIES = Object.keys(COUNTRY_CURRENCY);

/** The market the site opens with until the visitor picks another one. */
export const DEFAULT_COUNTRY = "United Arab Emirates";
export const DEFAULT_COUNTRY_CODE = "AE";

/** Cookie storing the selected country; read server-side in lib/country.js. */
export const COUNTRY_COOKIE = "db-country";

/** Gulf markets exposed by the country switcher in the footer. */
export const GULF_MARKETS = [
  { code: "AE", name: "United Arab Emirates", currency: "AED" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR" },
  { code: "QA", name: "Qatar", currency: "QAR" },
  { code: "KW", name: "Kuwait", currency: "KWD" },
  { code: "OM", name: "Oman", currency: "OMR" },
  { code: "BH", name: "Bahrain", currency: "BHD" },
];

/** Ways a buyer can pay, in the style of Bayut's payment-method chips. */
export const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "cash-bank-finance", label: "Cash & Bank Finance" },
  { value: "bank-finance", label: "Bank Finance" },
  { value: "mortgage", label: "Mortgage" },
];

export const PAYMENT_METHOD_LABEL = Object.fromEntries(
  PAYMENT_METHODS.map((m) => [m.value, m.label]),
);

export const AMENITIES = [
  { id: "parking", label: "Parking" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "security", label: "24x7 Security" },
  { id: "garden", label: "Garden" },
  { id: "balcony", label: "Balcony" },
  { id: "lift", label: "Elevator" },
  { id: "beach-access", label: "Private Beach Access" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "cctv", label: "CCTV" },
  { id: "play-area", label: "Children's Play Area" },
  { id: "mosque", label: "Prayer Room" },
];

export const AMENITY_LABEL = Object.fromEntries(
  AMENITIES.map((a) => [a.id, a.label]),
);

export const RESIDENTIAL_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "duplex", label: "Duplex" },
];

export const COMMERCIAL_TYPES = [
  { value: "office", label: "Office" },
  { value: "retail-shop", label: "Retail Shop" },
  { value: "showroom", label: "Showroom" },
  { value: "warehouse", label: "Warehouse" },
  { value: "commercial-building", label: "Commercial Building" },
  { value: "business-center", label: "Business Center" },
  { value: "co-working", label: "Co-working" },
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant" },
  { value: "commercial-land", label: "Commercial Land" },
];

export const ALL_TYPES = [...RESIDENTIAL_TYPES, ...COMMERCIAL_TYPES];
export const VALID_TYPES = new Set(ALL_TYPES.map((t) => t.value));

export const PROPERTY_TYPE_LABEL = Object.fromEntries(
  ALL_TYPES.map((t) => [t.value, t.label]),
);

export const FURNISHING_OPTIONS = [
  { value: "furnished", label: "Furnished" },
  { value: "semi-furnished", label: "Semi Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export const POSSESSION_OPTIONS = [
  { value: "ready", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" },
];

export const FURNISHING_LABEL = Object.fromEntries(
  FURNISHING_OPTIONS.map((o) => [o.value, o.label]),
);
export const POSSESSION_LABEL = Object.fromEntries(
  POSSESSION_OPTIONS.map((o) => [o.value, o.label]),
);

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const BED_OPTIONS = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5+" },
];

/** Local-currency price bounds. Every selected country has exactly one
 *  currency, so filter values compare directly against `property.price`. */
const PRICE_FILTER_VALUES = {
  AED: {
    sale: [
      250_000, 500_000, 750_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000,
      7_500_000, 10_000_000, 20_000_000,
    ],
    rent: [2_500, 5_000, 7_500, 10_000, 15_000, 25_000, 50_000, 75_000, 100_000],
  },
  SAR: {
    sale: [
      250_000, 500_000, 750_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000,
      7_500_000, 10_000_000, 20_000_000,
    ],
    rent: [2_500, 5_000, 7_500, 10_000, 15_000, 25_000, 50_000, 75_000, 100_000],
  },
  QAR: {
    sale: [
      250_000, 500_000, 750_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000,
      7_500_000, 10_000_000, 20_000_000,
    ],
    rent: [2_500, 5_000, 7_500, 10_000, 15_000, 25_000, 50_000, 75_000, 100_000],
  },
  KWD: {
    sale: [
      75_000, 150_000, 250_000, 400_000, 600_000, 1_000_000, 1_500_000,
      2_500_000, 5_000_000,
    ],
    rent: [750, 1_500, 2_500, 4_000, 6_000, 10_000, 15_000, 20_000],
  },
  OMR: {
    sale: [
      100_000, 200_000, 300_000, 500_000, 750_000, 1_000_000, 1_500_000,
      2_500_000, 5_000_000,
    ],
    rent: [1_000, 2_000, 3_000, 5_000, 7_500, 10_000, 15_000, 20_000],
  },
  BHD: {
    sale: [
      100_000, 200_000, 300_000, 500_000, 750_000, 1_000_000, 1_500_000,
      2_500_000, 5_000_000,
    ],
    rent: [1_000, 2_000, 3_000, 5_000, 7_500, 10_000, 15_000, 20_000],
  },
};

function compactLadderLabel(value) {
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}K`;
  return `${value}`;
}

/** Price bounds for one country's currency and purpose, e.g.
 *  priceLadder("AED", "rent") -> [{ value: 5000, label: "AED 5K/mo" }, ...] */
export function priceLadder(currency, purpose) {
  const ladders = PRICE_FILTER_VALUES[currency] ?? PRICE_FILTER_VALUES.AED;
  const isRent = purpose === "rent";
  const values = isRent ? ladders.rent : ladders.sale;
  const symbol = CURRENCIES[currency]?.symbol ?? "AED ";
  return values.map((v) => ({
    value: v,
    label: `${symbol}${compactLadderLabel(v)}${isRent ? "/mo" : ""}`,
  }));
}

export const AREA_OPTIONS = [500, 1000, 1500, 2000, 3000, 5000, 10000];
