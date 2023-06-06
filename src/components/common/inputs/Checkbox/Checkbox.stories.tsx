import React from 'react';

import { action } from '@storybook/addon-actions';

import { Checkbox } from './index';

export default {
  component: Checkbox,
};

export const Default = {
  args: {
    checked: false,
    onChange: action('onChange'),
  },
};

export const Checked = {
  args: {
    ...Default.args,
    checked: true,
  },
};
