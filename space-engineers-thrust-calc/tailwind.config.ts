import type { Config } from 'tailwindcss'

export default {
  theme: {
    colors: {
      'primary': '#90e581',
      'secondary': '#00d382',
      'tertiary': '#00d0ff',

      'primary-text': '#000000',
      'secondary-text': '#000000',
      'tertiary-text': '#000000',
    },
  },

  content: [
    '{routes,islands,components}/**/*.{ts,tsx}',
  ],
} satisfies Config
