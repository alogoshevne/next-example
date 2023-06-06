import { call } from 'redux-saga/effects';

import * as Sentry from '@sentry/react';

export function* handleError(error: any) {
  Sentry.captureException(error);
  yield call(console.log, 'error', error);
}
