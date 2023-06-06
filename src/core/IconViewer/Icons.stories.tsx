import React from 'react';

import { IconViewer } from '@core/IconViewer';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Svg',
  component: IconViewer,
  parameters: {
    docs: {
      page: null,
    }
  }
} as ComponentMeta<typeof IconViewer>;

export const Icons: ComponentStory<typeof IconViewer> = () => <IconViewer />;
