/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "accent": "#FFFFFF",
          "neutral": "#EDEDF5",
        },

        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "accent": "#FFB72B",
          "neutral": "#18181B",
        },
      }
    ]
  },
  plugins: [require("daisyui")],
};
