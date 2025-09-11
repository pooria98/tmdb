"use client";

import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { geistSans, geistMono } from "../fonts/fonts";

export const theme = createTheme({
  fontFamily: geistSans.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  headings: {
    fontFamily: `${geistSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
});
