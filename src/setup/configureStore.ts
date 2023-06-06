// Core
import * as R from 'ramda';
import { createLogger } from 'redux-logger';
import { Persistor, persistStore } from 'redux-persist';
import createSagaMiddleware, { Task } from 'redux-saga';
import { serverReduxLogger } from 'src/helpers/serverReduxLogger';

import { useMemo } from 'react';

import { verifyEnvironment } from '@helpers/env';
import { verifyBrowser } from '@helpers/verifyBrowser';
import { Middleware, Store, configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// @refresh reset
let store: Store | undefined;
type ExtendedStoreType = Store & {
  sagaTask: Task;
};

process.env.NODE_ENV !== 'development' &&
  Sentry.init({
    dsn: process.env.NEXT_APP_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });

const bindMiddleware = (middleware: Middleware[]): Middleware[] => {
  const { isDevelopment } = verifyEnvironment();
  const isBrowser = verifyBrowser();
  if (isDevelopment) {
    if (isBrowser) {
      const logger = createLogger({
        predicate: (getState, action) =>
          !action.type.includes('REDUX_WEBSOCKET'),
        duration: true,
        timestamp: true,
        collapsed: true,
        diff: true,
        colors: {
          title: (action: { error: any }): string => {
            return action.error ? 'firebrick' : 'deepskyblue';
          },
          prevState: (): string => 'dodgerblue',
          action: (): string => 'greenyellow',
          nextState: (): string => 'olivedrab',
          error: (): string => 'firebrick',
        },
      });

      middleware.push(logger);
    } else {
      middleware.push(serverReduxLogger);
    }
  }

  return middleware;
};

export const initStore = (preloadedState = {}): Store => {
  const defaultState = preloadedState
    ? configureStore({ reducer: rootReducer }).getState()
    : {};

  const currentState = R.mergeDeepRight(defaultState, preloadedState);

  const sagaMiddleware = createSagaMiddleware();
  const initedStore = configureStore({
    reducer: rootReducer,
    preloadedState: currentState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(...bindMiddleware([sagaMiddleware])),
  });

  (initedStore as ExtendedStoreType).sagaTask = sagaMiddleware.run(rootSaga);

  return initedStore;
};

export const initializeStore = (preloadedState = {}): Store => {
  let initializedStore = store || initStore(preloadedState);
  if (preloadedState && store) {
    initializedStore = initStore(
      R.mergeDeepRight(store.getState(), preloadedState),
    );

    store = undefined;
  }

  if (typeof window === 'undefined') {
    return initializedStore;
  }

  if (!store) {
    store = initializedStore;
  }

  return initializedStore;
};

export const useStore = (
  initialState = {},
): { store: Store; persistor: Persistor } => {
  const storeFn = () => {
    const store = initializeStore(initialState);
    const persistor = persistStore(store);

    return { store, persistor };
  };

  return useMemo(storeFn, [initialState]);
};
