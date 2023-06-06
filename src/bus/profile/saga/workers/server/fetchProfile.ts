import * as effects from 'redux-saga/effects';

import { api } from '@REST/api';
import { endpoints } from '@REST/endpoints';
import { IProfile } from "@bus/profile/typedefs";
import { handleError } from '@bus/ui/saga/workers/handleError';
import { throwError } from '@bus/ui/saga/workers/throwError';
import { PayloadAction } from '@reduxjs/toolkit';
import { ServerSideMeta } from '@setup/typedefs';

import { profileActions } from '../../../actions';
import { FetchProfileActionPayload } from '../../../typedefs';

export function* fetchProfile({
  meta,
}: PayloadAction<FetchProfileActionPayload, string, ServerSideMeta>) {
  try {
    const response: Response = yield effects.apply(api, api.server.get, [
      {
        endpoint: endpoints.FETCH_PROFILE,
        headers: { Authorization: `Bearer ${meta.token}` },
      },
    ]);
    if (!response.ok) {
      yield throwError(response);
    }
    const data: IProfile = yield effects.call([response, 'json']);
    yield effects.put(profileActions.fillProfile(data));
  } catch (e) {
    yield handleError(e);
  }
}
