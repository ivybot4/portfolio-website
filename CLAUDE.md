# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site (live at https://navyajain.dev/): React 19 + Vite + Tailwind CSS 3, client-side routed with React Router 7. Plain JavaScript/JSX, no TypeScript.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run lint      # ESLint (flat config; react-hooks + react-refresh rules)
npm run deploy    # builds, then publishes dist/ with gh-pages
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`, and check pages in the dev server.

## Architecture

Content is data-driven: almost all edits are to files under `src/data/` and `src/content/`, not to components. Each data file has a header comment explaining its fields; read it before editing.

- **Routes** ([src/App.jsx](src/App.jsx)): `/` → `Home`, `/projects/:id` → `ProjectDetail`, anything else redirects to `/`. [src/main.jsx](src/main.jsx) rewrites legacy `/#/...` hash URLs to clean paths before the router runs, so old shared links keep working.
- **Home page** ([src/pages/Home.jsx](src/pages/Home.jsx)) is one long page of sections (home, experience, projects, education, contact). The `id`s in its `navItems` must match the section `id`s used by `SectionNav`. Project detail pages link back with router state `{ scrollTo: "projects" }`, which Home uses to scroll.

### Projects: card data + optional Markdown write-up

A project has two parts joined by `id`:

1. A card entry in the `cards` array in [src/data/projects.js](src/data/projects.js) (title, tagline, `categories`, image, github, demo, etc.). Order in the array = order on the page and the prev/next order on detail pages. Unreleased projects are kept commented out in that array.
2. An optional write-up at `src/content/projects/<id>.md`, loaded at build time via `import.meta.glob(..., { query: "?raw", eager: true })` and parsed into `project.page`.

**Only projects with a matching `.md` file get a detail page** (`hasDetailPage`), a Details button, and a place in the prev/next pager.

The Markdown is parsed by a custom pipeline in [src/lib/parseMarkdown.js](src/lib/parseMarkdown.js) (built on `marked`), not a generic Markdown renderer:
- Frontmatter is a minimal hand-rolled parser (`key: value` and `key:` + `  - item` lists only). Recognized keys: `image` (hero image) and `stack` (comma list shown as `A · B`).
- Text before the first heading becomes the intro. `#` headings become top-level sections and `##` become subsections; both get slug ids used by the "On this page" sidebar (`OnThisPage`). Deeper headings stay inline in the HTML.
- An image alone on its own line becomes a `<figure>`, and its Markdown title becomes the `<figcaption>`.
- External `http(s)` links get `target="_blank"`.
- The rendered HTML is injected with `dangerouslySetInnerHTML` and styled by the `.prose-md` rules in [src/index.css](src/index.css) (not the Tailwind typography plugin).

### Filters

`projectFilters` (primary row) and `projectSubFilters` (grey row) in `projects.js` are matched against each card's `categories` array by [src/hooks/useCategoryFilters.js](src/hooks/useCategoryFilters.js). A filter with no matching projects is hidden automatically, so adding a category id to a card is all that is needed for it to appear.

### Demo videos

`project.demo` is either a URL (opens in a new tab) or a path to a video file (`.mp4/.mov/.m4v/.webm`, detected by `hasVideoDemo`). Video demos play in a `<dialog>` modal from the card/header button (`DemoLink`) and inline at the top of the detail page. `demoAspect` (width / height) sizes the player before metadata loads, and `demoPoster` is the cover image. `.mov` files are served with `type="video/mp4"` on purpose: H.264 `.mov` plays in all major browsers when typed that way.

### Assets and styling

- Static assets live in `public/` and are referenced via `` `${import.meta.env.BASE_URL}...` `` in JS (e.g. `public/projects/`, `public/work-exp/` for company logos, `public/education/` for education card images, `public/contact/` for contact icons, `public/demo/` for videos and posters).
- Fonts: Inter, League Spartan and Newsreader come from Google Fonts `@import`s in `index.css`; Open Sans Condensed comes from `@fontsource`. Tailwind font families `font-body`, `font-spartan` and `font-condensed` are defined in [tailwind.config.js](tailwind.config.js).
- The visual style is flat black-bordered boxes and uppercase tracked buttons on a lavender background (`#F8F2FA` / gradient on Home); match it when adding UI.

`notes/` holds draft write-ups that are not imported by the app. `dist/` is build output and is git-ignored.
