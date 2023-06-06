import * as effects from 'redux-saga/effects';

import { authActions } from '../actions';
// eslint-disable-next-line prettier/prettier
import {
  signIn,
  signUp,
} from './workers';

// IMPORTS

function* watchSignIn() {
  yield effects.takeEvery(authActions.signIn.type, signIn);
}

function* watchSignUp() {
  yield effects.takeEvery(authActions.signUp.type, signUp);
}
// WATCHERS
export function* watchAuth() {
  // eslint-disable-next-line prettier/prettier
  yield effects.all([
    effects.call(watchSignIn),
    effects.call(watchSignUp),
    // INJECT
  ]);
}
