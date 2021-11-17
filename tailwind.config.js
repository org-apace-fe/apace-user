module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Geometria"],
      },
      background: {},
      backgroundImage: {
        "footer-texture": `url('/icons/footer@3x.png')`,
        "apace-gray-2":
          "linear-gradient(0deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14)), #121212",
        "apace-gray-3":
          "linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), #121212",
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
