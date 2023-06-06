import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { ActionCreator } from 'redux';

import { disableSaga } from '@helpers/disableSaga';
import { initializeStore } from '@setup/configureStore';
import { initialDispatcher } from '@setup/initialDispatcher';

export const connectReduxStore = async (
  context: GetServerSidePropsContext | NextPageContext,
  dispatchOnLoad?: { action: ActionCreator<any>; payload?: any }[],
) => {
  const { store } = await initialDispatcher(context, initializeStore());

  const cookies = parseCookies(context);

  await dispatchOnLoad?.forEach((item) => {
    store.dispatch(
      item.action({ ...item.payload, token: cookies['accessToken'] }),
    );
  });

  await disableSaga(store);

  const newState = store.getState();

  const stateUpdates = {
    auth: {
      isAuthenticated: newState.auth.isAuthenticated,
    },
  };

  return { store, stateUpdates };
};
