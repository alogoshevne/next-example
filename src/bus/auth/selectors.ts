import { createSelector } from 'reselect';

import { RootState } from '@setup/typedefs';

const authSelector = (state: RootState) => state.auth;

export const getIsAuthFetching = createSelector([authSelector], (result) => {
  return { isFetching: result.isFetching };
});

export const getIsAuthenticate = createSelector([authSelector], (result) => {
  return result.isAuthenticated;
});

export const getIsInitialize = createSelector([authSelector], (result) => {
  return result.isInitialised;
});

