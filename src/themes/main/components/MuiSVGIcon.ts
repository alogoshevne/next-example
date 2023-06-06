import { Components, Theme } from '@mui/material';
import { SystemCssProperties } from '@mui/system/styleFunctionSx/styleFunctionSx';

const STROKE_MODE = true;

const strokeProperties = {
  fill: 'transparent',
  stroke: 'currentColor',
  '& path': {
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
};

export const MuiSvgIcon: Partial<Components<Theme>> = {
  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'medium',
    },
    styleOverrides: {
      root: ({ ownerState: { sx, color, ...rest } }) => {
        if (sx && (sx as SystemCssProperties<Theme>)?.fontSize) {
          const { fontSize } = sx as SystemCssProperties<Theme>;

          if (STROKE_MODE)
            return {
              width: `${fontSize as string}!important`,
              height: `${fontSize as string}!important`,
              ...strokeProperties,
            };

          return {
            width: `${fontSize as string}!important`,
            height: `${fontSize as string}!important`,
          };
        } else if (STROKE_MODE) {
          return strokeProperties;
        }
      },
    },

    variants: [
      {
        props: {
          fontSize: 'medium',
        },
        style: {
          fontSize: '32px',
          width: '32px',
          height: '32px',
        },
      },
      {
        props: {
          fontSize: 'small',
        },
        style: {
          fontSize: '24px',
          width: '24px',
          height: '24px',
        },
      },
      {
        props: {
          fontSize: 'large',
        },
        style: {
          fontSize: '40px',
          width: '40px',
          height: '40px',
        },
      },
    ],
  },
};
