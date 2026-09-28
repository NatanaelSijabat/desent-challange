# monis.rent — Workspace Builder

Interactive workspace configurator, faithful to the provided sketch.

## Tech stack (required)

- **Next.js** (App Router) — framework
- **Tailwind CSS** (v4, CSS-first via `@import "tailwindcss"`) — styling
- **Vercel** — deployment (`vercel.json` sets `framework: "nextjs"`, zero-config)

State is plain React (`useState` in `app/page.tsx`). No UI kit, no animation
or DnD libraries — the sketch doesn't need them.

Layout (matches sketch hierarchy):
- **Header/title area** — `monis.rent` brand + "Build your rental workspace" + live €/mo pill + `Rent Your Setup!` CTA
- **Left panel** — Desks (4: Oak, Standing, Walnut, Compact), Chairs (4: Ergo, Lounge, Wood, Racer), Accessories (Monitor, Laptop, Lamp, Plant, Headphones, Speaker)
- **Center** — Live visual workspace preview (SVG scene: every desk, chair, and accessory renders/disappears on select)
- **Right panel** — Accessory Add/Remove actions + `Ready to Rent?` card with `Rent Your Setup!` CTA
- **Bottom** — `Coffee Station`, `Outdoor Gear`, `Relax Zone`, `Garage Space` category cards (presentational, per sketch)
- **Summary** — `RentSummary` modal with selected desk, chair, accessories, item count + monthly total, and a confirmation state. No payment integration (by design).

## State

```ts
type WorkspaceState = {
  desk: string;
  chair: string;
  accessories: string[];
};
```

Client-side only (`useState` in `app/page.tsx`). No backend, no API endpoints.

## Components

```
app/
  layout.tsx              # metadata + globals.css
  page.tsx                # WorkspaceBuilder root + state ("use client")
  globals.css             # Tailwind import + monis.rent theme tokens
lib/
  data.ts                 # catalog + pricing + monthlyTotal()
components/
  Header.tsx
  ProductPanel.tsx        # DeskSelector + ChairSelector + AccessorySelector
  WorkspacePreview.tsx    # SVG live preview
  AccessoryActions.tsx    # right-side actions + Ready to Rent?
  RentSummary.tsx         # summary / checkout modal
  BottomCategories.tsx    # Coffee / Outdoor / Relax / Garage
```

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (verified: Next 15.5, static prerender of /)
npm run start  # serve production build
```

## Deploy to a public URL (Vercel)

1. Push this folder to GitHub.
2. Import the repo at https://vercel.com/new — Next.js is auto-detected
   (`vercel.json` declares `"framework": "nextjs"`). No env vars needed.
3. Deploy. Every push gets a preview URL; `main` gets the production URL.

## GitHub-ready + adding desent-bot

```bash
git init
git add -A
git commit -m "Migrate monis.rent workspace builder to Next.js + Tailwind"
gh repo create <owner>/desent-challange --public --source=. --push
gh api repos/<owner>/desent-challange/collaborators/desent-bot -X PUT -f permission=push
# or: GitHub repo → Settings → Collaborators → Add people → desent-bot
```

## Validation checklist

- [x] All 4 desks switch the visual desk (oak / standing + drawer / walnut wide / compact X-legs)
- [x] All 4 chairs switch the visual chair (ergo / lounge / wood slats / gaming racer)
- [x] All 6 accessories add + remove visually (monitor, laptop, lamp, plant, headphones stand, shelf speaker)
- [x] Selected state is obvious (highlight + chips + Add/Remove labels)
- [x] `Rent Your Setup!` opens summary with selected setup + totals
- [x] Confirmation state after "Confirm rental"
- [x] Bottom sections (Coffee / Outdoor / Relax / Garage) present
- [x] `npm run build` (`next build`) succeeds, no console errors
