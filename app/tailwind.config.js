/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tnpink: {
          DEFAULT: '#E91E63',
          dark: '#C2185B',
          light: '#FCE4EC',
          50: '#FFF1F5',
        },
        tnblue: {
          DEFAULT: '#1A237E',
          dark: '#0D1452',
          light: '#E8EAF6',
          mid: '#3F51B5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 16px rgba(15, 23, 42, 0.06)',
        card: '0 8px 24px rgba(26, 35, 126, 0.08)',
      },
    },
  },
  plugins: [],
};
