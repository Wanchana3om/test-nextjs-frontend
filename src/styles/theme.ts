// theme.ts
import { createTheme } from "@mui/material/styles";

// Define your custom colors
const colors = {
  green: {
    500: "#243831",
    300: "#2B5F44",
    100: "#D8E9E4",
  },
  golden: "#C5A365",
  black: "#000000",
  white: "#FFFFFF",
  gray: {
    100: "#BBC2C0",
    300: "#939494",
  },
  text: "#191919",
  success: "#49A569",
};

// Extend the Palette interface to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      base100: string;
      base300: string;
      black: string;
      white: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      base100?: string;
      base300?: string;
      black?: string;
      white?: string;
    };
  }
}

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: colors.green[500],
      light: colors.green[300],
      dark: colors.green[100],
    },
    secondary: {
      main: colors.golden,
    },
    text: {
      primary: colors.text,
    },
    background: {
      default: colors.gray[100],
    },
    success: {
      main: colors.success,
    },
    custom: {
      base100: colors.gray[100],
      base300: colors.gray[300],
      black: colors.black,
      white: colors.white,
    },
  },
});

export default theme;
