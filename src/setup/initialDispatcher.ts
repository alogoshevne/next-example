import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { Store } from 'redux';

import { verifyToken } from '@REST/api';
import { authActions } from '@bus/auth/actions';
import { profileActions } from '@bus/profile/actions';

export const initialDispatcher = async (
  context: GetServerSidePropsContext | NextPageContext,
  store: Store,
) => {
  const token = parseCookies(context)[process.env.AUTH_TOKEN_NAME];

  if (token && verifyToken(token)) {
    store.dispatch(authActions.setAuthenticated(true));
    store.dispatch(profileActions.fetchProfile({ token }));
  } else {
    store.dispatch(authActions.setAuthenticated(false));
  }

  return { store };
};
