import React from 'react';

import FinalForm from '@core/FinalForm';
import MockProvider from '@core/providers/MockProvider';
import interactions from '@helpers/interactions';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { StoryAnnotations } from '@storybook/types';

import ForgotPassword from './index';
import { schema } from './schema';

export default {
  title: 'forms/ForgotPassword',
  component: FinalForm,
  decorators: [(story: () => any) => <MockProvider>{story()}</MockProvider>],
};

export const ForgotPasswordSuccess: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: ForgotPassword,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.sleep(1000);
    await interactions.typeToInput(
      canvas,
      'forgot-password-email',
      'ex@mail.test',
    );
    // SUCCESS PLAY
    await interactions.clickSubmit(canvas);
    await interactions.sleep(1000);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};

export const ForgotPasswordError: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: ForgotPassword,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).not.toHaveBeenCalled());
  },
};
