// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import prepareActions from '@helpers/prepareActions';
import { createAction } from '@reduxjs/toolkit';

import uiSlice from './slice';

const actions = {
  ...uiSlice.actions,
  closeModal: createAction('ui/closeModal'),
  modal: createAction('ui/fillModal', (data) => {
    return {
      payload: data,
    };
  }),
  // INJECT
};

export const uiActions: typeof actions = actions;
