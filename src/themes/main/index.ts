import React from 'react';

import { PaletteMode, useMediaQuery } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { MuiButton } from './components/MuiButtonBase';
import { MuiSvgIcon } from './components/MuiSVGIcon';
import { MuiTypography } from './components/MuiTypography';
import { mixins } from './mixins';
import { dark } from './palette/dark';
import { light } from './palette/light';
import { typography } from './typography';

export const themeOptions: Partial<ThemeOptions> = {
  mixins,
  breakpoints,
  palette: light,
  typography,
  components: {
    ...MuiTypography,
    ...MuiButton,
    ...MuiSvgIcon,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? light : dark),
  },
});
export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return React.useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')),
    [prefersDarkMode],
  );
};
