module.exports = {
  // purge: [],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
