import { GetServerSideProps } from 'next';
import { mergeDeepRight } from 'ramda';

import { ReactElement } from 'react';

import Layouts from '@layouts/index';
import { connectReduxStore } from '@setup/connectReduxStore';

function Home() {
  return (
    <>
      <main>home page</main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layouts.AppLayout>{page}</Layouts.AppLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { store, stateUpdates } = await connectReduxStore(context, []);

  const state = store.getState();

  return {
    props: {
      initialReduxState: mergeDeepRight(stateUpdates, state),
    },
  };
};
