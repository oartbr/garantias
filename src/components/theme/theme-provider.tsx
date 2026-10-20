"use client";

import { extendTheme } from "@mui/material/styles";
import { CssVarsProvider } from "@mui/material/styles";
import { useMemo, PropsWithChildren } from "react";

function ThemeProvider(props: PropsWithChildren<{}>) {
  const theme = useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: {
            palette: {
              // This will override the default background color in light mode.
              background: {
                default: "#d9e4ef", // your desired light mode background color
              },
            },
          },
          dark: {
            palette: {
              // This will override the default background color in light mode.
              background: {
                default: "#29343f", // your desired dark mode background color
              },
            },
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: ({ theme }) => ({
                backgroundColor:
                  theme.palette.mode === "dark" ? "#09141f" : "#1976d2",
              }),
            },
          },
        },
      }),
    []
  );
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {props.children}
    </CssVarsProvider>
  );
}

export default ThemeProvider;
