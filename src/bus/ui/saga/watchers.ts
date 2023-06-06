import * as effects from 'redux-saga/effects';

import { uiActions } from '../actions';
// eslint-disable-next-line prettier/prettier
import {fetchTheme, modal, removeModal,} from './workers';

// IMPORTS
function* watchModal() {
  yield effects.takeEvery(uiActions.modal.type, modal);
}
function* watchRemoveModal() {
  yield effects.takeEvery(uiActions.closeModal.type, removeModal);
}
// WATCHERS
export function* watchUi() {
  // eslint-disable-next-line prettier/prettier
  yield effects.all([
    effects.call(watchModal),
    effects.call(watchRemoveModal),
    // INJECT
  ]);
}
