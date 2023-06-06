import React from 'react';

import db from '@mocks/db.json';

import { Select } from './';

export default {
  component: Select,
};

const { options } = db;

export const Default = {
  args: {
    label: 'Options',
    options: options.data,
  },
};
