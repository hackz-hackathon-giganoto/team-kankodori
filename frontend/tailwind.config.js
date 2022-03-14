const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Sawarabi Mincho', ...defaultTheme.fontFamily?.serif],
      },
      keyframes: {
        heart: {
          from: { transform: 'scale(1)', opacity: 1 },
          to: { transform: 'scale(1.05)', opacity: 0.9 },
        },
      },
    },
  },
  plugins: [],
};
