import { put } from 'redux-saga/effects';

import { uiActions } from '../../actions';

export function* removeModal() {
  yield put(uiActions.hideModal());
  yield put(uiActions.clearModal());
}
