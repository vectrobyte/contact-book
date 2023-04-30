import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f89e5',
        'primary-alt': '#91cbf9',
        'primary-light': '#e8f0fe',
      },
    },
  },
  plugins: [],
} satisfies Config;
