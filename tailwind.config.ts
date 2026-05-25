import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 30px 90px rgba(99, 102, 241, 0.16)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.18), transparent 35%)',
      },
    },
  },
  plugins: [],
};

export default config;
