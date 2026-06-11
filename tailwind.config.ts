import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E8',
        'dried-rose': '#C4856A',
        tannin: '#3B2E28',
        'sage-dust': '#9DA68C',
        'linen-fog': '#EAE5DA',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-18': '0.18em',
      },
    },
  },
  plugins: [],
}
export default config
