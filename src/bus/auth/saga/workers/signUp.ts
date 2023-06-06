import { apply, call, put } from 'redux-saga/effects';

import { api } from '@REST/api';
import { authActions } from '@bus/auth/actions';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import {
  FormErrors,
  ServerFormErrors,
  getServerFormErrors,
} from '@core/FinalForm/getServerErrors';
import { FinalFormTypes } from '@core/FinalForm/typedefs';
import { PayloadAction } from '@reduxjs/toolkit';

import { SignUpActionPayload } from '../../typedefs';

export function* signUp({
  payload,
  meta: { resolve, reject },
}: PayloadAction<SignUpActionPayload, string, FinalFormTypes.ResolveReject>) {
  try {
    yield put(authActions.startFetching());
    const body: string = yield call(JSON.stringify, payload);

    const response: Response = yield apply(api, api.client.post, [
      { endpoint: `/api/auth/signup`, body, unsafe: true },
    ]);

    if (response.status === 400) {
      const errors: ServerFormErrors = yield call([response, 'json']);
      const formErrors: FormErrors = yield call(getServerFormErrors, errors);
      reject(formErrors);
      yield throwError(response);
    }

    if (!response.ok) {
      reject();
      yield throwError(response);
    }

    resolve();
  } catch (e) {
    yield handleError(e);
  } finally {
    yield put(authActions.stopFetching());
  }
}
