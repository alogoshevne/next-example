import React from 'react';

import FinalForm from '@core/FinalForm';
import interactions from '@helpers/interactions';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { StoryAnnotations } from '@storybook/types';

import MockProvider from '../../../core/providers/MockProvider';
import { EmailVerification } from './index';
import { schema } from './schema';

export default {
  title: 'forms/EmailVerification',
  component: FinalForm,
  decorators: [(story: () => any) => <MockProvider>{story()}</MockProvider>],
};

export const Default: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    initialValues: { password: '' },
    component: EmailVerification,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.sleep(1000);
    await interactions.typeToInput(
      canvas,
      'email-verification-email',
      'test@mail.com'
    );
    // SUCCESS PLAY
    await interactions.clickSubmit(canvas);
    await interactions.sleep(1000);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};

export const Error: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    initialValues: { email: '' },
    component: EmailVerification,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).not.toHaveBeenCalled());
  },
};
