# Varahi Catering & Real Estate — Phase 1 Landing Page

A high-conversion lead-generation landing page built with **Angular 17 (standalone components)**, **Reactive Forms**, and **Tailwind CSS**.

## Quick start

```bash
npm install
npm start          # http://localhost:4200
```

Production build:

```bash
npm run build
```

## Project structure

```
src/
├── app/
│   ├── app.component.ts
│   ├── pages/
│   │   └── landing-page/
│   │       └── landing-page.component.ts          # composes the page
│   ├── components/
│   │   ├── header/header.component.ts             # nav with mobile menu
│   │   ├── hero/hero.component.ts                 # split-screen hero
│   │   ├── catering-form/catering-form.component.ts
│   │   ├── real-estate-form/real-estate-form.component.ts
│   │   ├── about/about.component.ts               # placeholder
│   │   ├── contact/contact.component.ts           # phone / WhatsApp / email
│   │   ├── footer/footer.component.ts
│   │   └── toast/toast-container.component.ts
│   └── services/
│       ├── toast.service.ts                       # signal-based toast queue
│       └── lead.service.ts                        # stub — swap for real API in Phase 2
├── styles.scss                                    # Tailwind + brand component classes
└── index.html
```

## What's wired up

- **Dual-hero layout** — split-screen, warm catering aesthetic on the left, clean real-estate aesthetic on the right.
- **Shared sticky header** with logo, Catering / Real Estate / About links, and a Contact Us button. Mobile menu included.
- **Catering form** — Name, Email, Event Date (`min` = today), Guest Count, Event Type (radio segments).
- **Real Estate form** — Name, Email, Interest (Buy/Sell/Rent), Property Type, Budget Range.
- **Validation** — required fields, email format, min length / min number, with inline error messages.
- **Success state** — each form swaps to a confirmation card after submit, plus a non-blocking toast notification.
- **Toast service** — signal-based, auto-dismisses after 4.5s, supports `catering` / `realestate` / `success` / `error` variants.
- **Tailwind brand palette** — `brand` (maroon/gold/cream), `catering` (warm orange), `realestate` (forest green).

## Deploy to GitHub Pages

You have two options.

### Option A — automatic (recommended): GitHub Actions

A workflow is already included at `.github/workflows/deploy.yml`.

1. Push the repo to GitHub.
2. In your repo go to **Settings → Pages** and set **Source = GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Site goes live at `https://<your-username>.github.io/<repo-name>/`.

The workflow uses the repo name as the `--base-href`, so it works regardless of what you call the repo. It also drops a `404.html` and a `.nojekyll` file in the build output for a smoother SPA experience.

### Option B — manual one-shot from your laptop

```bash
# If your repo is named something other than "varahi-landing",
# edit the --base-href in the build:gh script in package.json first.
npm run deploy
```

This builds with the right base-href and pushes the `dist/varahi-landing/browser` folder to a `gh-pages` branch via the `angular-cli-ghpages` package. After it finishes, set **Settings → Pages → Source = Deploy from a branch** → `gh-pages` / `/ (root)`.

### Custom domain (optional)

If you want `varahi.in` instead of the github.io subdomain:

1. Add a `CNAME` file to `src/` containing `varahi.in` (Angular will copy it on build — also add it to `assets` in `angular.json`), or commit it directly into the `gh-pages` branch.
2. In your DNS provider, add four `A` records for `@` pointing to GitHub's Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and a `CNAME` for `www` → `<user>.github.io`.
3. In **Settings → Pages**, enter your custom domain and tick **Enforce HTTPS**.

With a custom domain, you can drop `--base-href` (or set it back to `/`) since the site lives at the domain root.

## Phase 2 hooks

Swap `src/app/services/lead.service.ts` from the in-memory `of(...)` stub to real HTTP calls:

```ts
return this.http.post<{ ok: true }>('/api/leads/catering', payload);
```

Then add `provideHttpClient()` in `main.ts`.

## Contact information used

- Phone / WhatsApp: **7799256666**
- Email: hello@varahi.in
- Proprietor: Venigalla Venkata Kutumba Rao
