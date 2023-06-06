import { createSelector } from 'reselect';

import { RootState } from '@setup/typedefs';

const uiSelector = (state: RootState) => state.ui;

export const getIsModalOpen = createSelector([uiSelector], (result) => {
  return result.isModalOpen;
});
export const getModalData = createSelector([uiSelector], ({ modalData }) => {
  return modalData;
});
