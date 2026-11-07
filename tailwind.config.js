/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FCF1EE', blush: '#F7DFDB', rose: '#EBC8C8',
        mauve: '#A9707A', wine: '#6B1F2D', ink: '#4A2B30',
      },
      fontFamily: {
        display: ['"Great Vibes"', 'cursive'],
        brand: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 30px -14px rgba(107,31,45,.28)',
        lift: '0 22px 44px -16px rgba(107,31,45,.38)',
      },
    },
  },
  plugins: [],
}
