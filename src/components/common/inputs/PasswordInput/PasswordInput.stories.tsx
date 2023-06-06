import React from 'react';

import { action } from '@storybook/addon-actions';

import { PasswordInput } from './index';

export default {
  component: PasswordInput,
};

export const Default = {
  args: {
    label: 'Password',
    showPassword: false,
    setShowPassword: action('setShowPassword'),
    onChange: action('onChange'),
  },
};

export const Filled = {
  args: {
    ...Default.args,
    value: '123452',
  },
};

export const PasswordVisible = {
  args: {
    ...Default.args,
    value: '123452',
    showPassword: true,
  },
};
