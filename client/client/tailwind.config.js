/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom max-width values
      maxWidth: {
        'screen': '100vw',
        'full': '100%',
      },
      // Add important utility for overflow
      overflow: {
        'x-hidden': 'hidden hidden',
      },
    },
  },
  plugins: [
    // Add plugin to handle overflow more effectively
    function({ addUtilities }) {
      addUtilities({
        '.overflow-x-container': {
          'max-width': '100vw',
          'overflow-x': 'hidden',
          'position': 'relative',
        },
      });
    },
  ],
};