
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1990FF',
          50: '#E6F4FF',
          100: '#BAE0FF',
          200: '#91CAFF',
          300: '#69B4FF',
          400: '#4096FF',
          500: '#1990FF',
          600: '#0070E0',
          700: '#0058B3',
          800: '#004085',
          900: '#002857',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
