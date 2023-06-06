import { put } from 'redux-saga/effects';

import { uiActions } from '../../actions';
import { handleError } from './handleError';

export function* fetchTheme() {
  try {
    yield put(uiActions.startFetching());
  } catch (e) {
    yield handleError(e);
  } finally {
    yield put(uiActions.stopFetching());
  }
}
