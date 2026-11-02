export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        milk: '#fdf7f2',
        paper: '#fffaf5',
        blush: '#f4dadd',
        powder: '#eabcc5',
        berry: '#a74361',
        plum: '#6f2944',
        ink: '#4b333b',
        gold: {
          DEFAULT: '#c9a56a',
          100: '#f6ecd6',
          200: '#eeddb5',
          300: '#e6cfa0',
          400: '#d4b47a',
          500: '#c9a56a',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Marck Script"', 'cursive'],
        letter: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
};
