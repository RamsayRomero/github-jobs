const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Poppins', 'system-ui'],
      body: ['Roboto', 'system-ui'],
    },
    colors: {
      white: colors.white,
      gray: colors.blueGray,
      blue: colors.blue,
    },
    extend: {
      backgroundImage: (theme) => ({
        'search-background': "url('/src/assets/backgroundImg.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
