module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "footer-texture": `url('/icons/footer@3x.png')`,
      },
      colors: {
        "apace-orange-light": "#F0874A",
        "apace-orange-dark": "#ED6E24",
        "apace-gray": "#1E1E1E",
        "apace-black": "#121212",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
