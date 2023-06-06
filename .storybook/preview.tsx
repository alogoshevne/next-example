import { themeOptions, getDesignTokens } from "../src/themes/main";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

const withMuiTheme = (Story, context) => {
  const mode = context.globals?.muiMode;
  const muiTheme = useMemo(() => createTheme({
    ...themeOptions,
    palette: {
      mode,
      ...getDesignTokens(mode).palette,
    }
  }), [mode])
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Story {...context} />
  </ThemeProvider>
)
}

export const decorators = [
  withMuiTheme,
  (storyFn) => <div style={{minHeight: 80}}>{storyFn()}</div>
];

const customViewports = {
  largeDesktop: {
    name: 'Large desktop',
    styles: {
      width: '2560px',
      height: '1440px',
    },
  },
  bigDesktop: {
    name: 'Big desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  midDesktop: {
    name: 'Middle desktop',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
  smallDesktop: {
    name: 'Small desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  bigTable: {
    name: 'Big table',
    styles: {
      width: '921px',
      height: '1368px',
    },
  },
  midTable: {
    name: 'Middle table',
    styles: {
      width: '820px',
      height: '1180px',
    },
  },
  smallTable: {
    name: 'Small table',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  midPhone: {
    name: 'Mid phone',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  smallPhone: {
    name: 'Small phone',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: customViewports,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};