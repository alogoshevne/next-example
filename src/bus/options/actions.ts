import prepareActions from '@helpers/prepareActions';
import { createAction } from '@reduxjs/toolkit';

import optionsSlice from './slice';

export const optionsActions = {
  ...optionsSlice.actions,
  // INJECT
};
