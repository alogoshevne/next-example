import { createSelector } from 'reselect';

import { RootState } from '@setup/typedefs';

const profileSelector = (state: RootState) => state.profile;

export const getIsProfileFetching = createSelector(
  [profileSelector],
  (result) => {
    return { isFetching: result.isFetching };
  },
);

export const getCurrentUserId = createSelector([profileSelector], (result) => {
  return result.profile?.id;
});

export const getCurrentUserProfile = createSelector(
  [profileSelector],
  (result) => {
    return result.profile
      ? result.profile
      : null;
  },
);
