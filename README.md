# Divine Bricks

A property marketplace for buying, renting, selling and listing **residential and commercial** real estate.
Built with Next.js (App Router), JavaScript, Tailwind CSS and lucide-react.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+ (Node 20/22 recommended). Optionally set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap and structured data).

> Photography is served from Unsplash as demo content. Every image falls back to a neutral tile if a photo is unavailable.
> Swap the URLs in `src/data/*.js` and the host in `next.config.js` for your own CDN.

## What is in it

| Area | Routes |
|---|---|
| Public | `/`, `/properties`, `/properties/buy`, `/rent`, `/residential`, `/commercial`, `/properties/[slug]`, `/search`, `/map-search` |
| Marketplace | `/agents`, `/agents/[slug]`, `/projects`, `/projects/[slug]`, `/areas`, `/areas/[slug]` |
| Conversion | `/sell`, `/rent-out`, `/list-property`, `/list-property/new` (10-step wizard) |
| Account | `/login`, `/register`, `/dashboard` (+ properties, add, saved, searches, messages, leads, profile, settings) |
| Other | `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`, `sitemap.xml`, `robots.txt` |

**Search is URL-driven.** Every filter lives in the query string, for example
`/properties?purpose=sale&category=residential&city=new-york&minPrice=1000000&maxPrice=5000000`.
The parser (`src/lib/search.js`) ignores invalid values, so a hand-edited URL never breaks the page.

## International listings & currencies

Demo data covers **10 countries**: United States, United Kingdom, UAE, Singapore, Australia,
Canada, France, Germany, Switzerland and Japan. Every listing is priced in its local currency
(USD, GBP, AED, SGD, AUD, CAD, EUR, CHF, JPY) via the `currency` field on each location in
`src/data/locations.js`. Prices render with the right symbol and compact format (`$3.95M`,
`£1.85M`, `¥185M`, `AED 1,200/mo`). Budget filters and sorting compare prices fairly across
currencies by converting through `toUsd()` in `src/lib/format.js` (static demo rates).

## Structure

```
src/
  app/            routes (server components by default)
  components/
    ui/           button, badge, form fields, toast, modal, pagination, skeleton, empty state
    layout/       header (sticky), footer, mobile bottom nav, logo
    home/         hero, category cards, featured tabs, sections
    search/       hero SearchBar, URL-driven PropertyFilters, sort/view, advanced search
    property/     card, gallery, amenities, details, lead form, contact, favourite, share
    map/          MapView (reusable) + MapSearch
    listing/      listing wizard + image uploader
    dashboard/    sidebar, stats, tables, inbox, forms
  data/           mock data: 22 residential, 10 commercial, 5 projects, 10 agents, 10 cities
  lib/            api (mock service), search, format, seo, validation, saved-store
```

Client components are used only where there is interaction (filters, gallery, forms, map, wizard, toasts).

## Connecting a real backend

All data access goes through `src/lib/api.js`. Each function is async and returns plain data, so replace the bodies with
`fetch()` calls (REST) or a GraphQL client and nothing else changes. Other seams:

- `src/lib/listing-service.js`: `submitListing` and `submitLead`
- `src/components/auth/auth-form.jsx`: replace the timeout with your auth provider
- `src/lib/saved-store.js`: saved properties use localStorage; mirror writes to your API when users sign in
- `src/components/map/map-view.jsx`: placeholder map with the props a Google Maps / Mapbox version needs; no API key required today
- `src/lib/nearby.js`: mock "nearby places"; replace with a places API

## Design system

Brand tokens are in `tailwind.config.js`: charcoal `ink`, warm `paper`, `emerald` accent and `gold` highlight, with
Fraunces (display) and Inter (text). Property photography is the visual lead, cards are borderless on listing grids, and
trust badges (Verified, Featured, New, Owner Listed, Licensed, Premium) are deliberately small.
