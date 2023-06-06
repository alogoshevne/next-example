import React from 'react';

import { RadioGroup } from './index';

export default {
  component: RadioGroup,
};

export const Default = {
  args: {
    values: [
      { label: 'value', id: 1 },
      { label: 'value2', id: 2 },
    ],
  },
};

export const WithLabel = {
  args: {
    values: [
      { label: 'value', id: 1 },
      { label: 'value2', id: 2 },
    ],
    label: 'value',
  },
};
