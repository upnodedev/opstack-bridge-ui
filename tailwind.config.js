import { colors } from "./theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      base: {
        white: "#FFFFFF",
        black: "#000000",
        transparent: "#FFFFFF00",
      },
      "red-primary": "#EB001A",
      primary: {
        main: colors["gray-light"][900].value,
        _hover: colors["gray-light"][50].value,
        "on-brand": "#FFFFFF"
      },
      secondary: {
        main: colors["gray-light"][700].value,
        _hover: colors["gray-light"][800].value,
        "on-brand": colors["brand"][200].value,
      },
      tertiary: {
        main: colors["gray-light"][600].value,
        _hover: colors["gray-light"][700].value,
        "on-brand": colors["brand"][200].value,
      },
      quarterary:{
        main: colors["gray-light"][500].value,
        "on-brand": colors["brand"][300].value,
      },
      brand: {
        primary: colors.brand[900].value,
        secondary: colors.brand[700].value,
        tertiary: colors.brand[600].value,
      },
      placeholder: {
        main: colors["gray-light"][500].value,
        subtitle: colors["gray-light"][300].value,
        "on-brand": colors["brand"][300].value,
      },
      error: {
        primary: colors.error[600].value,
      },
      warning: {
        primary: colors.warning[600].value,
      },
      success: {
        primary: colors.success[600].value,
      },
      border: {
        primary: colors["gray-light"]["300"].value,
        secondary:colors["gray-light"]["200"].value,
        tertiary:colors["gray-light"]["100"].value,
        brand:colors['brand']['300'].value,
        "brand-solid":colors['brand']['600'].value,
        "brand-solid-alt":colors['brand']['600'].value,
        error:colors['error']['300'].value,
        'error-solid':colors['error']['600'].value,
        disabled:colors['gray-light']['300'].value,
        "disabled-subtle":colors['gray-light']['200'].value
      },
      background:{
        primary: {
          main:"#ffffff",         
          solid:colors["gray-light"]["950"].value,
          _hover:colors["gray-light"]["50"].value,
          _alt:"#ffffff"
      },
        secondary:{
          primary:colors['gray-light']['50'].value,
          _alt:colors['gray-light']['50'].value,
          solid:colors["gray-light"]["600"].value,
          _hover:colors["gray-light"]["100"].value,
          _subtle:colors["gray-light"]["25"].value,
        },
        overlay:{
          primary:colors["gray-light"]["950"].value,
        },
        tertiary:colors["gray-light"]["100"].value,
        quaternary:colors["gray-light"]["200"].value,
        brand:{
          primary:colors['brand']['50'].value,
          primary_alt:colors['brand']['50'].value,
          secondary:colors['brand']['100'].value,
          section:colors['brand']['800'].value,
          section_subtle:colors['brand']['700'].value,
          solid:colors['brand']['600'].value,
          solid_hover:colors['brand']['700'].value,
        },
        error:{
          primary:colors['error']['50'].value,
          secondary:colors['error']['100'].value,
          solid:colors['error']['600'].value,
        },
        warning:{
          primary:colors['warning']['50'].value,
          secondary:colors["warning"]["100"].value,
          solid:colors["warning"]["600"].value,
        },
        success:{
          primary:colors['success']['50'].value,
          secondary:colors['success']['100'].value,
          solid:colors['success']['600'].value,
        },
        disabled:{
          primary:colors['gray-light']['100'].value,
          _subtle:colors['gray-light']['50'].value,

        },
        active:{
          primary:colors['gray-light']['50'].value,
        }
      },
      foreground:{
        primary:{
          main:colors['gray-light']['900'].value
        },
        secondary:{
          primary:colors['gray-light']['700'].value,
          _hover:colors['gray-light']['800'].value
        },
        tertiary:{
          primary:colors['gray-light']['600'].value,
          _hover:colors['gray-light']['700'].value,
        },
        quarterary:{
          primary:colors['gray-light']['500'].value,
          _hover:colors['gray-light']['600'].value
        },
        quinary:{
          primary:colors['gray-light']['400'].value,
          _hover:colors['gray-light']['500'].value,
          _alt:colors['gray-light']['600'].value
        },
        brand:{
          primary:colors['brand']['600'].value,
          secondary:colors['brand']['500'].value,
        },
        warning:{
          primary:colors["warning"]["600"].value,
          secondary:colors['warning']['500'].value,

        },
        success:{
          primary:colors["success"]["600"].value,
          secondary:colors["success"]["500"].value,
        },
        error:{
          primary:colors["error"]["600"].value,
          secondary:colors["error"]["500"].value,
        },
        white:"#ffffff",
        senary:colors['gray-light']['300'].value,
        disabled:{
          primary:colors['gray-light']['400'].value,
          _subtle:colors['gray-light']['300'].value,
        }

      },
      grey: {
        50: colors["gray-light"]["50"].value,
      },
      disabled: colors["gray-light"][500].value,
    },
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
