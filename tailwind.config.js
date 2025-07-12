const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // For HeroUI components
  ],
  darkMode: "class", // Optional: if you want dark mode support
  theme: {
    extend: {},
  },
  plugins: [heroui()] // Apply HeroUI's Tailwind plugin
};