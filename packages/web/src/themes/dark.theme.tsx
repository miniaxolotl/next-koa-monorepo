import { baseThemeColors } from './base.theme';

const themeColors = {
  primary: {
    50: baseThemeColors.parchment[50],
    100: baseThemeColors.parchment[100],
    200: baseThemeColors.parchment[200],
    300: baseThemeColors.parchment[300],
    400: baseThemeColors.parchment[400],
    500: baseThemeColors.parchment[500],
    600: baseThemeColors.parchment[600],
    700: baseThemeColors.parchment[700],
    800: baseThemeColors.parchment[800],
    900: baseThemeColors.parchment[900],
  },
  alt: {
    50: baseThemeColors.blue[50],
    100: baseThemeColors.blue[100],
    200: baseThemeColors.blue[200],
    300: baseThemeColors.blue[300],
    400: baseThemeColors.blue[400],
    500: baseThemeColors.blue[500],
    600: baseThemeColors.blue[600],
    700: baseThemeColors.blue[700],
    800: baseThemeColors.blue[800],
    900: baseThemeColors.blue[900],
  },
  bg: {
    50: baseThemeColors.grey[50],
    100: baseThemeColors.grey[100],
    200: baseThemeColors.grey[200],
    300: baseThemeColors.grey[300],
    400: baseThemeColors.grey[400],
    500: baseThemeColors.grey[500],
    600: baseThemeColors.grey[600],
    700: baseThemeColors.grey[700],
    800: baseThemeColors.grey[800],
    900: baseThemeColors.grey[900],
  },
  brand: {
    50: baseThemeColors.green[50],
    100: baseThemeColors.green[100],
    200: baseThemeColors.green[200],
    300: baseThemeColors.green[300],
    400: baseThemeColors.green[400],
    500: baseThemeColors.green[500],
    600: baseThemeColors.green[600],
    700: baseThemeColors.green[700],
    800: baseThemeColors.green[800],
    900: baseThemeColors.green[900],
  },
};

export const darkTheme = {
  colors: {
    bg: { base: themeColors.bg[800], light: themeColors.bg[700], dark: themeColors.bg[900] },
    primary: { base: themeColors.primary[50], light: themeColors.primary[50], dark: themeColors.primary[200] },
    alt: { base: themeColors.alt[500], light: themeColors.alt[300], dark: themeColors.alt[700] },
    brand: { base: themeColors.brand[500], light: themeColors.brand[400], dark: themeColors.brand[600] },
  },
};
