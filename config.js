import { fileURLToPath } from 'node:url'
import { fontProviders } from 'astro/config'

// Fonts are named by package path, not file path, so a build makes the same font-family names on any machine
const font = (file) => [`@wave-land-web/design/fonts/${file}.woff2`, `@wave-land-web/design/fonts/${file}.woff`]

/**
 * The fonts, for `fonts` in astro.config.mjs. Load them in the layout's <head> with Astro's <Font> component.
 * SEE: https://docs.astro.build/en/guides/fonts/
 */
export const fonts = [
  {
    provider: fontProviders.local(),
    name: 'Monaspace Argon Var',
    cssVariable: '--font-monaspace',
    options: {
      variants: [
        {
          src: font('monaspace-argon-var-extra-light'),
          weight: 400,
          style: 'normal',
        },
        {
          // SemiBold, instanced from the same Monaspace Argon v1.200 variable font and subset to the same characters.
          // It answers every weight from 600 up (font-semibold, font-bold, <strong>), so the browser never fakes bold.
          src: font('monaspace-argon-var-semibold'),
          weight: '600 900',
          style: 'normal',
        },
        // Italics, instanced the same way at the font's own slant (-11°), so the browser never fakes italic either
        {
          src: font('monaspace-argon-var-extra-light-italic'),
          weight: 400,
          style: 'italic',
        },
        {
          src: font('monaspace-argon-var-semibold-italic'),
          weight: '600 900',
          style: 'italic',
        },
      ],
    },
  },
  {
    provider: fontProviders.local(),
    name: 'Poppins Regular',
    cssVariable: '--font-poppins',
    options: {
      variants: [
        {
          src: font('poppins-regular'),
          weight: 400,
          style: 'normal',
        },
      ],
    },
  },
]

/**
 * Options for the astro-icon integration: icon(iconOptions). The logo and wordmark (TitleLogo) load from icons/ here.
 * SVGO keeps the logos' prefixed IDs; its default renames them to "a", "b"... which collide when several logos share a page.
 */
export const iconOptions = {
  iconDir: fileURLToPath(new URL('./icons', import.meta.url)),
  svgoOptions: {
    plugins: [{ name: 'preset-default', params: { overrides: { cleanupIds: false } } }],
  },
}
