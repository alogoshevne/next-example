import { createSelector } from 'reselect';

import { RootState } from '@setup/typedefs';

const optionsSelector = (state: RootState) => state.options;

export const getOptions = (key: string) =>
  createSelector([optionsSelector], (options) => {
    return options[key];
  });
