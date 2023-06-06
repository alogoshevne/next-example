import prepareActions from '@helpers/prepareActions';
import { createAction } from '@reduxjs/toolkit';

import authSlice from './slice';

export const authActions = {
  ...authSlice.actions,
  postSupport: createAction(
    'auth/postSupport',
    prepareActions.movePromiseToMeta,
  ),
  authenticate: createAction('auth/authenticate'),
  signUp: createAction('auth/signUp', prepareActions.movePromiseToMeta),
  applyMembership: createAction(
    'applications',
    prepareActions.movePromiseToMeta,
  ),
  signIn: createAction('auth/signIn', prepareActions.movePromiseToMeta),
  forgotPassword: createAction(
    'auth/reset-password-request',
    prepareActions.movePromiseToMeta,
  ),
  resetPassword: createAction(
    'auth/reset-password',
    prepareActions.movePromiseToMeta,
  ),
  setPassword: createAction(
    'auth/set-password',
    prepareActions.movePromiseToMeta,
  ),
  confirmEmail: createAction(
    'auth/confirm-email',
    prepareActions.movePromiseToMeta,
  ),
  // INJECT
};
