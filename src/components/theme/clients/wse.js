"use client";

import extendTheme from "@mui/material/styles/experimental_extendTheme";

const clientTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
        background: {
          default: "#d9e4ef", // Light mode default background
          paper: "#f5f5f5", // Background for paper surfaces
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" },
        background: {
          default: "#121212", // Dark mode default background
          paper: "#1d1d1d", // toolbar bg color
        },
      },
    },
  },
  customImages: {
    logo: "https://xvzq0akbnljx2cl9.public.blob.vercel-storage.com/themes/wse/logo.wse.short.white-pn6QrG6ag6In2ivoueODvCs3mQ85Hm.svg",
    hero: "/images/clientA-hero.jpg",
  },
});

export default clientTheme;
