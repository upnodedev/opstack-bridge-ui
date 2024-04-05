
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: ({ colors }) => ({
      primary: {
        DEFAULT: '#FFBE98',
      },
      secondary: {
        DEFAULT: '#28AFDC',
      },
      tertiary: {
        DEFAULT: '#A62C8A',
      },
      "gray-dark": "#8c8c8c",
      "gray-medium": "#4C4E64AD",
      "gray-light": "#F9FAFB",
      ...colors,
    }),
    fontFamily: {
      primary: ["DM Sans","Inter"],
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
