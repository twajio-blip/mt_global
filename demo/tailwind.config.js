export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        mcaa: {
          blue: '#105493',
          navy: '#073B6B',
          footer: '#062E53',
          light: '#EDF5FB',
          page: '#F5F7F8',
          border: '#D8E0E6',
          text: '#1E2933',
          muted: '#64717C',
          gold: '#D5A63F',
          red: '#B42318',
          green: '#287A55',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'system-ui', 'sans-serif'],
        bn: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        shell: '1320px',
      },
      borderRadius: {
        mcaa: '5px',
      },
    },
  },
}
