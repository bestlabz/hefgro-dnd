const defaultTheme = require("tailwindcss/defaultTheme");


const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary_color: "#BBDEFB",
        primary_text_color: "#0D47A1",
        secondary_text_color: "#d3d3d3",
        cancel_color: "#E64A19",
        success_color: "#008000",
        primary_bg_color: "#90CAF9"
      },
    },
  },
 
}

module.exports = {
  ...config,
};
