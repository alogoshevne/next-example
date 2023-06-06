import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { useStore } from '@setup/configureStore';

import { useAppTheme } from '../themes/main';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { store, persistor } = useStore(pageProps.initialReduxState);
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = useAppTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate persistor={persistor}>
          {() => getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
