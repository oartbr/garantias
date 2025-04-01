"use client";

import extendTheme from "@mui/material/styles/experimental_extendTheme";

const clientTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#0391b1" },
        secondary: { main: "#00c4de" },
        background: {
          default: "#f6f6ff", // Light mode default background
          paper: "#f5f5f5", // Background for paper surfaces
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#0070a4" },
        secondary: { main: "#004310" },
        background: {
          default: "#112627", // Dark mode default background
          paper: "#003c4a", // toolbar bg color
        },
      },
    },
  },
  customImages: {
    logo: "https://xvzq0akbnljx2cl9.public.blob.vercel-storage.com/themes/servimath/logo-300x86-H3oS80OSt0tyo0sRNZhRoQwVdLK0tZ.png",
    hero: "/images/clientA-hero.jpg",
  },
});

export default clientTheme;
