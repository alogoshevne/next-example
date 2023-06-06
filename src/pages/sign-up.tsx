import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';

import { ReactElement } from 'react';

import { authActions } from '@bus/auth/actions';
import { SignUpForm, schema } from '@components/forms/SignUp';
import FinalForm from '@core/FinalForm';
import Layouts from '@layouts/index';
import { connectReduxStore } from '@setup/connectReduxStore';
import { withPublicPage } from '@utils/withPublicPage';

function SignUp() {
  const router = useRouter();

  return (
    <>
      <main>
        <FinalForm
          sagaAction={authActions.signIn}
          component={SignUpForm}
          onSubmitSuccess={() => router.push('/')}
          schema={schema}
        />
      </main>
    </>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <Layouts.AuthLayout>{page}</Layouts.AuthLayout>;
};

const serverSideProps: GetServerSideProps = async (context) => {
  const { store, stateUpdates } = await connectReduxStore(context, []);

  const state = store.getState();

  return {
    props: {
      initialReduxState: mergeDeepRight(stateUpdates, state),
    },
  };
};

export const getServerSideProps = withPublicPage(serverSideProps);

export default SignUp;
