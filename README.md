# Wave Land design

The design system behind [wavelandweb.com](https://wavelandweb.com), shared by every Wave Land app: Tailwind 4 tokens and utilities, the fonts, motion, and the components with no site content in them.

## Install

```sh
npm install github:wave-land-web/design#v1.0.0
```

It needs Astro 7 with `@astrojs/react` and `astro-icon`, and Tailwind 4 through `@tailwindcss/vite`.

## Set up

In `astro.config.mjs`, pass the fonts and the icon options in:

```js
import { fonts, iconOptions } from '@wave-land-web/design/config'

export default defineConfig({
  integrations: [icon(iconOptions), react()],
  vite: { plugins: [tailwindcss()] },
  fonts,
})
```

In the main stylesheet, import it right after Tailwind. App-only rules go below it.

```css
@import 'tailwindcss';
@import '@wave-land-web/design/styles/index.css';
```

In the layout's `<head>`, add the motion script and the fonts:

```astro
---
import { Font } from 'astro:assets'
import Motion from '@wave-land-web/design/components/Motion.astro'
---

<Motion />
<Font cssVariable="--font-monaspace" preload={[{ style: 'normal' }]} />
<Font cssVariable="--font-poppins" preload />
```

Import components by file, extension included: `@wave-land-web/design/components/Link.tsx`.

## What's in it

- `styles/tokens.css`: colors, fonts, the type scale, spacing, widths and motion timing (the `@theme` block).
- `styles/utilities.css`: `btn`, `link-arrow`, `label`, `media`, `stack`, `gap-split`, `section-split`, and the `hocus` variants.
- `styles/motion.css`: page transitions, `hero-in` and `lsa`, and reduced motion.
- `styles/base.css`: element defaults, typography, focus rings and the dashed `.text-container` card.
- `styles/index.css`: all four in order, plus the `@source` that lets Tailwind find the classes in `components/`.
- `components/`: `CTA`, `Link`, `ArrowIcon`, `Pill`, `TitleLogo`, `PageHeader`, `DateAndReadTime` and `Motion`.
- `fonts/`: Monaspace Argon and Poppins, under the SIL Open Font License (the `OFL-*.txt` files).
- `icons/`: the wave logo and the wordmark, for astro-icon.
- `config.js`: the font and astro-icon settings.

## Design rules

Use the tokens and utilities rather than raw values.

- **Colors, fonts and type sizes:** Tailwind theme tokens (`text-purple`, `font-header`, `text-prose` and so on). No stray hex codes. The site is dark only, on `bg-darkBlue`.
- **Radius:** `rounded-media` for cards and frames, the `media` utility for images shown on their own (corners plus shadow; images are plain by default), `rounded-control` for buttons and pills, `rounded-field` for inputs.
- **Spacing and widths:** `py-section`, `mb-header`, `pt-page-top`, `top-sticky`, `gap-split`, `stack`, `max-w-copy` and `max-w-narrow`.
- **Buttons and links:** `btn`, `btn-primary`, `btn-secondary` and `btn-toggle`, plus the `CTA` and `Link` components. One primary button per screen. Standalone links carry an arrow (`ArrowIcon`, `link-arrow`) that nudges on hover: → for a page on the same site, ↗ for another site. Links inside copy are underlined; nav links just change color. Three links in a row go purple, orange and green, in that order.
- **Hover and focus:** use `hocus:` (hover or keyboard focus), `hocus-within:` (or a focused child) and `group-hocus:` instead of pairing `hover:` with `focus-visible:` by hand.
- **Motion:** `hero-in` for content above the fold and `lsa` for content that reveals on scroll. Stagger items with `style="--i: n"`, and reveal whole sections or cards, not single paragraphs. Timing uses `--transition`, `--duration-reveal`, `--duration-move`, `--ease-reveal` and `--stagger`.
- **Page transitions:** pages crossfade (View Transitions API) and the nav stays still (`view-transition-name: site-nav`). Reduced motion turns off every animation.

## Changing it

Make the change here, then tag a release:

```sh
git tag v1.1.0 && git push --tags
```

Then bump the tag in each app's `package.json` and check its deploy preview before merging. Check styling on a production build or a deploy preview, not only the dev server; production CSS loads in a different order.
