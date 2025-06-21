// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#90caf9" : "#3b4d61", // Light blue / dark navy
      },
      secondary: {
        main: isDark ? "#bbdefb" : "#c1d3fe", // Pale blue
      },
      background: {
        default: isDark ? "#0f172a" : "#edf2fb", // Dark slate / light background
        paper: isDark ? "#1e293b" : "#ffffff", // Card/paper
      },
      text: {
        primary: isDark ? "#e3f2fd" : "#3b4d61", // Light text on dark / dark text on light
        secondary: isDark ? "#90caf9" : "#5a7184",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });
};
