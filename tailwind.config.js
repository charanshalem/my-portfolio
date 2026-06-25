/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        cyan: {
          300: '#67e8f9',
          400: '#00f5ff',
          500: '#06b6d4',
        },
      },
    },
  },
  plugins: [],
};
