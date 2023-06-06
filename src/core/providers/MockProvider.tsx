import { InitialEntry } from 'history';
import { SnackbarProvider } from 'notistack';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { registeredModals } from '@components/modals';
import InfoSnackbar from '@components/snackbars/InfoSnackbar';
import { useStore } from '@setup/configureStore';
import { RootState, Subset } from '@setup/typedefs';

import { Modals } from '../Modal';

type MockProviderProps = {
  preloadedState?: Subset<RootState>;
  routeEntries?: InitialEntry[];
  children: any;
};
const MockProvider: React.FC<MockProviderProps> = ({
  preloadedState = {},
  routeEntries = [''],
  children,
}: MockProviderProps) => {
  const { store } = useStore(preloadedState);

  return (
    <div>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          Components={{
            infoSnackbar: InfoSnackbar,
          }}>
          <MemoryRouter initialEntries={routeEntries}>
            {children}
            <Modals registeredModals={registeredModals} />
          </MemoryRouter>
        </SnackbarProvider>
      </Provider>
    </div>
  );
};

export default MockProvider;
