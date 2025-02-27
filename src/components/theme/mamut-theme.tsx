"use client";
import { createTheme } from "@mui/material/styles";

const mamutTheme = createTheme({
  palette: {
    mode: "light", // Change to 'dark' for dark mode
    contrastThreshold: 4.5,
    primary: {
      main: "#b7d7f6", // custom primary color
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#006680", // will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#ff0000", // custom secondary color
      // light: will be calculated from palette.secondary.main,
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#006680", // custom secondary color
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      color: "colorPrimary",
    },
  },
});

export default mamutTheme;
