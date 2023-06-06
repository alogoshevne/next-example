import { FORM_ERROR } from 'final-form';
import { apply, call, put } from 'redux-saga/effects';

import { api, saveAccessToken } from '@REST/api';
import { authActions } from '@bus/auth/actions';
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { FinalFormTypes } from '@core/FinalForm/typedefs';
import { PayloadAction } from '@reduxjs/toolkit';

import { SignInActionPayload } from '../../typedefs';

export function* signIn({
  payload,
  meta: { resolve, reject },
}: PayloadAction<SignInActionPayload, string, FinalFormTypes.ResolveReject>) {
  try {
    yield put(authActions.startFetching());
    const { remember_me, password, email } = payload;
    const body: string = yield call(JSON.stringify, { password, email });

    const response: Response = yield apply(api, api.client.post, [
      { endpoint: `/api/auth/signIn`, body, direct: true, unsafe: true },
    ]);

    if (response.status === 400) {
      reject({
        [FORM_ERROR]: 'Please check you credentials',
      });
      yield throwError(response);
    }

    if (response.status === 403) {
      reject({
        [FORM_ERROR]: 'Please check you credentials',
      });
      yield throwError(response);
    }

    const { token } = yield call([response, 'json']);
    saveAccessToken(token, remember_me);

    resolve();
  } catch (e) {
    yield handleError(e);
  } finally {
    yield put(authActions.stopFetching());
  }
}
