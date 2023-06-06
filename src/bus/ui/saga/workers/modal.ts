import { AnyAction } from 'redux';
import { put } from 'redux-saga/effects';

import { uiActions } from '../../actions';

export function* modal({ payload }: AnyAction) {
  yield put(uiActions.fillModalData(payload));
  yield put(uiActions.showModal());
}
