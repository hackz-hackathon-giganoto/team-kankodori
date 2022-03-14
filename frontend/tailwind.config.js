const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Sawarabi Mincho', ...defaultTheme.fontFamily?.serif],
      },
    },
  },
  plugins: [],
};
