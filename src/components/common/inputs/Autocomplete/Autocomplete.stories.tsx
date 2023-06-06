import React from 'react';

import db from '@mocks/db.json';

import { Autocomplete } from './';

export default {
  component: Autocomplete,
};

const { options } = db;

export const Default = {
  args: {
    label: 'Label',
    options: options.data,
    'data-testid': 'autocomplete',
  },
};
