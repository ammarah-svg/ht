/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        background: '#111827'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        urdu: ['var(--font-urdu)']
      }
    },
  },
  plugins: [],
}