/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        primary: '#d0d6f9',
        'accent-purple': '#a855f7',
        'accent-cyan': '#06b6d4',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cosmic-gradient': 'linear-gradient(to right, #c084fc, #22d3ee)',
      }
    },
  },
  plugins: [],
}
