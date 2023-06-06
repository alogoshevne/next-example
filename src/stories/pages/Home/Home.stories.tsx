import MockProvider from '@core/providers/MockProvider';
import AppLayout from '@layouts/AppLayout';
import Home from '../../../pages';

import defaultState from './defaultState.json';
export default {
  component: Home,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    }
  }
}

export const Default = {
  decorators: [
    (story: () => any) => (
      <MockProvider preloadedState={defaultState} routeEntries={['/']}>
        <AppLayout>
          {story()}
        </AppLayout>
      </MockProvider>
    )
  ]
}