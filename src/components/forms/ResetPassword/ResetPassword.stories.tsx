import React from 'react';

import FinalForm from '@core/FinalForm';
import MockProvider from '@core/providers/MockProvider';
import interactions from '@helpers/interactions';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { StoryAnnotations } from '@storybook/types';

import ResetPassword from './index';
import { schema } from './schema';

export default {
  title: 'forms/ResetPassword',
  component: FinalForm,
  decorators: [(story: () => any) => <MockProvider>{story()}</MockProvider>],
};

export const ResetPasswordSuccess: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: ResetPassword,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.sleep(1000);
    await interactions.typeToInput(
      canvas,
      'reset-password-password',
      '_km5gRo&)260XQX',
    );
    await interactions.typeToInput(
      canvas,
      'reset-password-repeat-password',
      '_km5gRo&)260XQX',
    );
    // SUCCESS PLAY
    await interactions.sleep(1000);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};

export const ResetPasswordError: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: ResetPassword,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).not.toHaveBeenCalled());
  },
};
