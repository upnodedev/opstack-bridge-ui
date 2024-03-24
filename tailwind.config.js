
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      ...colors,
    }),
    fontFamily: {
      primary: ["DM Sans"],
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
