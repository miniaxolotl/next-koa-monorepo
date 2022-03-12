import { baseTheme, themeColors } from './base.theme';

const darkThemeColors = {
  primary: {
    50: themeColors.bone[50],
    100: themeColors.bone[100],
    200: themeColors.bone[200],
    300: themeColors.bone[300],
    400: themeColors.bone[400],
    500: themeColors.bone[500],
    600: themeColors.bone[600],
    700: themeColors.bone[700],
    800: themeColors.bone[800],
    900: themeColors.bone[900],
  },
  bg: {
    50: themeColors.nightSky[50],
    100: themeColors.nightSky[100],
    200: themeColors.nightSky[200],
    300: themeColors.nightSky[300],
    400: themeColors.nightSky[400],
    500: themeColors.nightSky[500],
    600: themeColors.nightSky[600],
    700: themeColors.nightSky[700],
    800: themeColors.nightSky[800],
    900: themeColors.nightSky[900],
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    bg: {
      base: darkThemeColors.bg[800],
      light: darkThemeColors.bg[700],
      dark: darkThemeColors.bg[900],
    },
    primary: {
      base: darkThemeColors.primary[100],
      light: darkThemeColors.primary[50],
      dark: darkThemeColors.primary[200],
    },
  },
};
