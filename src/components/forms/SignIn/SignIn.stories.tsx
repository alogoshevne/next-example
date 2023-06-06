import React from 'react';

import FinalForm from '@core/FinalForm';
import MockProvider from '@core/providers/MockProvider';
import interactions from '@helpers/interactions';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { StoryAnnotations } from '@storybook/types';

import SignIn from './index';
import { schema } from './schema';

export default {
  title: 'forms/SignIn',
  component: FinalForm,
  decorators: [(story: () => any) => <MockProvider>{story()}</MockProvider>],
};

export const SignInSuccess: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: SignIn,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.sleep(1000);
    await interactions.typeToInput(canvas, 'sign-in-email', 'non@mail.test');
    await interactions.typeToInput(
      canvas,
      'sign-in-password',
      '_km5gRo&)260XQX',
    );
    await interactions.clickElement(canvas, 'sign-in-remember-me');
    // SUCCESS PLAY
    await interactions.sleep(1000);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};

export const SignInError: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: SignIn,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).not.toHaveBeenCalled());
  },
};
