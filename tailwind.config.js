module.exports = {
  theme: {
    extend: {
      backdropFilter: {
        'blur-sm': 'blur(4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
};