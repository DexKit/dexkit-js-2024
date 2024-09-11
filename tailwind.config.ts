import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#F15A24',
        'primary-dark': '#F24023',
        secondary: '#5F25E0',
        background: '#FDF1EC',
        text: '#010101',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config