import React from 'react';

import { Interpolation, TypographyProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const typographyVariants:
  | {
      props: Partial<TypographyProps<'span', {}>>;
      style: Interpolation<{ theme: Theme }>;
    }[]
  | undefined = [
  {
    props: {
      variant: 'title',
    },
    style: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '25px',
      lineHeight: '30.000001907348633px',
      letterSpacing: '0px',
    },
  },
];

// types
declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {
    title: true;
  }
}

declare module '@mui/material/styles' {
  export interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}
