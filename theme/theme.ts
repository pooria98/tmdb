"use client";

import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { geistSans, geistMono } from "../fonts/fonts";

export const theme = createTheme({
  fontFamily: geistSans.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  headings: {
    fontFamily: `${geistSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
  primaryColor: "seagreen",
  primaryShade: 9,
  colors: {
    seagreen: [
      "#f0faf4",
      "#e0f2e8",
      "#bce4cd",
      "#95d7b1",
      "#75cb99",
      "#60c489",
      "#54c081",
      "#45a96e",
      "#3a9761",
      "#2e8b57",
    ],
  },
});
