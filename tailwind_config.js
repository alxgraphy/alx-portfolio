/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',           // enables dark: variants + our toggle
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'], // raw, coder feel
        // You can change to 'IBM Plex Mono', 'JetBrains Mono' etc. later
      },
      letterSpacing: {
        extreme: '0.25em',
        ultra: '0.40em',        // very wide for big headings
      },
      borderWidth: {
        thick: '4px',           // brutal thick borders
        'extra-thick': '6px',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
}