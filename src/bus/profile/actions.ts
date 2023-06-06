import prepareActions from '@helpers/prepareActions';
import { createAction } from '@reduxjs/toolkit';

import profileSlice from './slice';

export const profileActions = {
  ...profileSlice.actions,
  fetchProfile: createAction(
    'profile/fetchProfile',
    prepareActions.toServerSide,
  ),
  updateProfile: createAction(
    'profile/updateProfile',
    prepareActions.movePromiseToMeta,
  ),

  // INJECT
};
