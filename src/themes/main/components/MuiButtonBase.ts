import { Components, Theme } from '@mui/material';

export const MuiButton: Partial<Components<Theme>> = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      color: 'primary',
    },
  },
};
