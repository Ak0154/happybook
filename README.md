# Happy Book Web App

A web-first rebuild of the Happy Book experience using Next.js 14 (App Router) and TypeScript. Desktop-first responsive layouts, then scaled down to tablet/mobile (Android PWA friendly). iOS build targets are intentionally omitted for now.

## Stack
- Next.js 14 (app directory)
- React 18
- TypeScript
- CSS modules-in-JSX (keeps styles colocated). You can swap to Tailwind or a design system later.

## Scripts
- `npm install`
- `npm run dev` (start dev server)
- `npm run build` (production build)
- `npm start` (serve production build)

## Routing map
- `/` → Welcome
- `/login` → Login/Sign Up
- `/language` → Language selection
- `/academic-test` → Academic test question
- `/psychological-test` → Psychological test question
- `/loading` → Loading/profile build
- `/journey-ready` → Journey ready confirmation

## Theming
Global tokens in `styles/globals.css` mirror the Flutter light palette: primary `#644a40`, secondary `#ffdfb5`, surfaces `#f9f9f9`, etc.

## PWA / Android
- `public/manifest.json` set for standalone install. Add icons under `public/icons` and reference them in the manifest.
- Add a service worker (e.g., next-pwa) if you need offline.

## Notes
- No iOS target: keep as web + Android PWA.
- Components are static; wire actual data/auth later.
- Media queries favor desktop-first layouts, then collapse on narrow screens.
