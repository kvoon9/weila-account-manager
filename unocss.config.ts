import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWebFonts, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'border-base': 'border-#8884',
    },
  ],
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
