/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e5fcdc",
          200: "#c7f9bb",
          300: "#9eec95",
          400: "#76db75",
          500: "#4bc355",
          600: "#36a74a",
          700: "#258c40",
          900: "#0e5d31",
        },
        danger: {
          100: "#ffe5d3",
          200: "#ffc4a9",
          300: "#ff9c7e",
          400: "#ff765d",
          500: "#ff3728",
          600: "#db1d1f",
          700: "#b71423",
          800: "#930c24",
          900: "#7a0725",
        },
        white: {
          white: "ffffff",
          awhite: "#eeeeee",
          shadedwhite: "#dddddd",
          darkwhite: "#cccccc",
        },
        gray: {
          silver: "bbbbbb",
          palegray: "#aaaaaa",
          lightgray: "#999999",
          tintedgray: "#888888",
          mediumgray: "#777777",
          shadedgray: "#666666",
          darkgray: "#555555",
        },

        black: {
          paleblack: "#444444",
          lightblack: "#333333",
          tintedblack: "#222222",
          almostblack: "#111111",
          black: "#000000",
        },

        others: {
          malibu: "#4ABCFC",
          gossip: "#C7F9BB",
          broom: "#FFE816",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
