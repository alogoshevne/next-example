import MockProvider from '@core/providers/MockProvider';
import AppLayout from '@layouts/AppLayout';
import SignUp from '../../../pages/sign-up';

import defaultState from './defaultState.json';
export default {
  component: SignUp,
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