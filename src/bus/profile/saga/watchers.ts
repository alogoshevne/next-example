import * as effects from 'redux-saga/effects';

import { profileActions } from '../actions';
// eslint-disable-next-line prettier/prettier
import {
  fetchProfile,
} from './workers';

// IMPORTS
function* watchFetchProfile() {
  yield effects.takeEvery(profileActions.fetchProfile.type, fetchProfile);
}
// WATCHERS
export function* watchProfile() {
  // eslint-disable-next-line prettier/prettier
  yield effects.all([
    effects.call(watchFetchProfile),
    // INJECT
  ]);
}
