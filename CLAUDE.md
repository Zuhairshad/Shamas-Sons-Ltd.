# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # node_modules is not checked in; required first
pnpm dev            # next dev — http://localhost:3000
pnpm build          # next build
pnpm start          # serve the production build
npx tsc --noEmit    # the only real type check (see caveat below)
```

- `pnpm lint` is declared in [package.json](package.json) but **does not work** — eslint is not a dependency and there is no eslint config. Don't rely on it or report its failure as a code problem.
- There is no test framework in this project. Verify changes by running the dev server.
- [next.config.mjs](next.config.mjs) sets `typescript.ignoreBuildErrors: true`, so `pnpm build` passes with type errors. Use `npx tsc --noEmit` when types matter.

### Deploying

`pnpm deploy` (or `./deploy.sh`) on the server: pull → `pnpm install --frozen-lockfile` → `pnpm build` → `pm2 startOrReload`. `SKIP_PULL=1` skips the git pull. Process config is [ecosystem.config.js](ecosystem.config.js) — one fork-mode instance of `next start` on port 3000. Keep `instances: 1`: the mock cart is per-process state, so multiple workers would hand different carts to the same visitor. Server env vars live in `.env.production` (gitignored, created manually on the server); `NEXT_PUBLIC_*` values are inlined at build time, so changing them requires a rebuild, not just a restart.

## Stack

Next.js 16 App Router · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (new-york, `components/ui/`) · pnpm. Path alias `@/*` → repo root.

Tailwind v4 is CSS-first: there is **no `tailwind.config.*`**. All design tokens live in `@theme inline` inside [app/globals.css](app/globals.css).

## Architecture

### Storefront data layer with mock fallback — the central concept

[lib/shopify/client.ts](lib/shopify/client.ts) (~1500 lines) is the single data source for the whole app. Every exported function follows the same shape:

```ts
export async function getProducts(options?) {
  try { return await shopifyFetch(...) }   // real Shopify Storefront GraphQL
  catch { /* serve from MOCK_PRODUCTS */ }
}
```

`shopifyFetch` throws immediately unless `NEXT_PUBLIC_SHOPIFY_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` are set (API version `2025-01`), so **with no `.env.local` the app always runs on the mock path** — that is the normal development state. Consequences worth knowing:

- The catalog is 18 hardcoded `MOCK_PRODUCTS` objects at the top of `client.ts`, derived from [amazon_brasso_products.csv](amazon_brasso_products.csv) (a scrape of Brasso listings on amazon.co.uk). To add/change a product, edit that array. Conventions: `id: 'gid://shopify/Product/<ASIN>'`, variant `id: 'gid://shopify/ProductVariant/v-<ASIN>'`, `handle: '<slug>-<lowercased-asin>'`.
- The mock branch re-implements Shopify behaviour in plain JS: sorting (`BEST_SELLING` = `best-seller` tag first, `PRICE`, `TITLE`, `CREATED_AT`), and the Shopify-style query prefixes `product_type:` and `tag:`. `/products?type=liquid` becomes `query: 'product_type:liquid'` — keep that prefix convention when adding filters.
- The mock cart is a **module-level `localCart` singleton** mutated in place, with `recalculateLocalCart()` recomputing totals. It is server-process-global: shared by all visitors and wiped on restart, and `checkoutUrl` is `'#'`. Fine for the demo, not a real cart.
- Mock prices are GBP. `formatPrice` in [lib/shopify/utils.ts](lib/shopify/utils.ts) coerces a `PKR` currency code to `GBP` — a leftover from the CSV, which lists PKR prices.

`lib/shopify/index.ts` re-exports client + types + utils, but most files import from `@/lib/shopify/client` and `@/lib/shopify/utils` directly.

### Two paths to that layer

- **Server Components** (`app/page.tsx`, `app/products/page.tsx`, `app/products/[handle]/page.tsx`) call `getProducts` / `getProductByHandle` / `getFeaturedProducts` / `getCollections` directly.
- **Client Components** go through the route handlers in [app/api/](app/api/) (`products`, `collections`, `search`, `cart`), which are thin wrappers over the same functions. `/api/cart` is a single POST endpoint dispatching on `action: 'create' | 'add' | 'update' | 'remove'`.

[components/cart/cart-provider.tsx](components/cart/cart-provider.tsx) is the only consumer of `/api/cart`: a `useReducer` context that also owns drawer open/close state and persists the cart id in `localStorage` under `shopify_cart_id`. `useCart()` is used by [product-card.tsx](components/product/product-card.tsx), [product-info.tsx](components/product/product-info.tsx), [pill-nav.tsx](components/layout/pill-nav.tsx) and [cart-drawer.tsx](components/cart/cart-drawer.tsx).

### Layout and theming

[app/layout.tsx](app/layout.tsx) wraps everything in `CartProvider` and globally mounts `PillNav` (the site nav) and `CartDrawer`. Nav items are defined inline there.

The theme is **dark-only** — no light palette, no `next-themes` in use. Tokens in [app/globals.css](app/globals.css): near-black surfaces, `--primary: #E4001B` (Brasso red), Bebas Neue via `--font-heading` (used as `font-heading` + `tracking-wider` + uppercase for all headings) and Jost as body sans. Fonts are loaded with `next/font/google` in the layout.

`styles/globals.css` is an **unused leftover** with a different (light) palette. Edit `app/globals.css` only.

### Known dead code

Not imported anywhere; ignore unless asked to remove: `components/layout/header.tsx` (superseded by `pill-nav.tsx`), `components/layout/search-modal.tsx`, `components/theme-provider.tsx`, `components/ui/interactive-checkout.tsx`, `components/ui/scroll-based-velocity.tsx`, `styles/globals.css`, and the stock shadcn `hooks/`.

## Images

`next.config.mjs` allows `cdn.shopify.com`, `m.media-amazon.com`, `images-na.ssl-images-amazon.com`. Mock products mostly point at remote Amazon CDN URLs; local copies live in `public/picas/pp/` (Amazon-derived product shots, used by home-page category cards) and `public/images/`.

## Do not run

- [push-project.bat](push-project.bat) — `git init` + `git remote add` + `git push --force` to a third-party GitHub repo with a hardcoded commit message.
- [copy-assets.js](copy-assets.js) / [copy-variants.js](copy-variants.js) — one-off image copiers with hardcoded Windows paths (`C:/Users/user/...`) that do not exist on this machine.

Commits in this repo follow Conventional Commits (`feat:`, `fix:`, `style:`).
