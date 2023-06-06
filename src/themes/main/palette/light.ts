import { PaletteOptions } from '@mui/material/styles/createPalette';

export const light: PaletteOptions = {
  mode: 'light',
  common: {
    white: '#ffffff',
    red: '#FF6565',
    green: '#65FF74',
  },
};
// types
declare module '@mui/material/styles/createPalette' {
  export interface CommonColors {
    white: string;
    red: string;
    green: string;
  }
  export interface PaletteOptions {
    common?: Partial<CommonColors>;
  }
}
