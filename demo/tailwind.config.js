export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#EEF3FA',
          100: '#D9E3F2',
          200: '#B3C6E4',
          300: '#86A3D1',
          500: '#2F5A96',
          600: '#1F4580',
          700: '#173764',
          800: '#10294D',
          900: '#0B1F3A',
          950: '#07152A',
        },
        accent: {
          50: '#EAF7F1',
          100: '#CDEEDD',
          500: '#12A06A',
          600: '#0E8A5B',
          700: '#0B6F49',
        },
        ink: {
          900: '#0F1B2D',
          700: '#334155',
          600: '#4B5A6E',
          500: '#66758A',
          400: '#94A1B2',
          300: '#C4CCD7',
        },
        line: '#E2E8F0',
        surface: '#F4F6F9',
        danger: { 50: '#FEF2F2', 100: '#FEE2E2', 600: '#DC2626', 700: '#B91C1C' },
        warn: { 50: '#FFFBEB', 100: '#FEF3C7', 700: '#B45309' },
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,45,0.04), 0 4px 16px rgba(15,27,45,0.06)',
        lift: '0 2px 4px rgba(15,27,45,0.06), 0 12px 28px rgba(15,27,45,0.10)',
      },
      maxWidth: {
        page: '1240px',
      },
    },
  },
};
