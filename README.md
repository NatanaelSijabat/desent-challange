# monis.rent — Workspace Builder

Interactive workspace configurator, faithful to the provided sketch.

## Tech stack (required)

- **Next.js** (App Router) — framework
- **Tailwind CSS** (v4, CSS-first via `@import "tailwindcss"`) — styling
- **Vercel** — deployment (`vercel.json` sets `framework: "nextjs"`, zero-config)

State is plain React (`useState` in `app/page.tsx`). No UI kit, no animation
or DnD libraries — the sketch doesn't need them.

Layout (matches sketch hierarchy):
- **Header/title area** — `monis.rent` brand + "Build your rental workspace" + live €/mo pill + theme toggle (🌙/☀️, persisted in localStorage) + `Rent Your Setup!` CTA
- **Left panel** — Desks (4: Oak, Standing, Walnut, Compact), Chairs (4: Ergo, Lounge, Wood, Racer)
- **Center** — Live **3D** workspace preview (Three.js room: every desk, chair, and accessory renders/disappears on select; default 1 monitor, up to 3 stackable; drag for limited orbit)
- **Right panel** — Accessories (Main/Side/Top Monitor, Laptop, Lamp, Plant, Headphones, Speaker) with Add/Remove actions + `Ready to Rent?` card with `Rent Your Setup!` CTA
- **Bottom** — `Coffee Station`, `Outdoor Gear`, `Relax Zone`, `Garage Space` cards; each opens a detail modal with sample rentals **plus one "Add to workspace" prop** (mug, crate, pouf, toolbox) that appears in the 3D scene and the rental summary
- **Summary** — `RentSummary` modal with selected desk, chair, accessories, item count + monthly total, and a confirmation state. No payment integration (by design).

## Theme: dark RGB gaming studio + light mode

- Default is **dark**: near-black room, dark concrete floor, walnut/black desks,
  RGB LED strip under every desk (purple → blue → pink) with floor bounce,
  monitor backlight halos, rainbow mechanical keyboard, night window with city
  lights, cool cyan lamp. Same geometry/positions as light mode — only
  materials, lighting, and colors change.
- Toggle in the header switches to the original bright Scandinavian light
  theme. Implemented with zero geometry duplication: one 3D scene, palette +
  lighting switch (`Theme` prop); RGB strips, halos, and glows render only in
  dark mode.
- App chrome follows via Tailwind v4 `@theme inline` runtime tokens
  (`bg-surface`, `bg-soft`, …) + class-based `dark:` variant, so layout
  classes are untouched.

## State

```ts
type WorkspaceState = {
  desk: string;
  chair: string;
  accessories: string[];
  extras: string[]; // category props: extra-mug/crate/pouf/toolbox
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
  WorkspacePreview.tsx    # preview shell: label + chips + 3D canvas (dynamic)
  studio3d/StudioCanvas.tsx # Three.js canvas (ssr:false), lights, orbit limits
  studio3d/Room.tsx         # floor, rug, wall, window, shelf
  studio3d/Desk.tsx         # 4 procedural desks + RGB LED strip
  studio3d/Chair.tsx        # 4 procedural chairs
  studio3d/Screens.tsx      # main/side/top monitors + laptop
  studio3d/Props.tsx        # keyboard, lamp, plant, headphones, speaker
  studio3d/theme.ts         # light/dark palettes + RGB constants
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

- [x] All 4 desks switch the 3D desk (oak / standing + drawer / walnut wide / compact X-legs)
- [x] All 4 chairs switch the 3D chair (ergo / lounge / wood slats / gaming racer)
- [x] All 8 accessories add + remove in 3D (3 monitors, laptop, lamp, plant, headphones, speaker)
- [x] Side + Top monitors stack around the main monitor (default: 1 monitor on)
- [x] Dark RGB theme in 3D: LED strip + point lights, monitor glow, RGB keyboard, night window; toggle back to light works
- [x] Lighting balanced for comfort: lifted ambient, capped emissive/highlights in both themes
- [x] Category modals add real 3D props (mug/crate/pouf/toolbox) into scene + summary + totals
- [x] Full 360° orbit + scroll zoom (polar clamped so you can't go under the floor)
- [x] 3D loads client-side only (`ssr:false`), first-load JS stays ~109 kB
- [x] Selected state is obvious (highlight + chips + Add/Remove labels)
- [x] `Rent Your Setup!` opens summary with selected setup + totals
- [x] Confirmation state after "Confirm rental"
- [x] Bottom sections (Coffee / Outdoor / Relax / Garage) present
- [x] `npm run build` (`next build`) succeeds, no console errors
