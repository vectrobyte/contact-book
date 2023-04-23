import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f89e5',
        'primary-light': '#91cbf9',
      },
    },
  },
  plugins: [],
} satisfies Config;
