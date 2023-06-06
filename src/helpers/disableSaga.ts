import { END } from 'redux-saga';

export const disableSaga = async (store: {
  sagaTask?: any;
  dispatch?: any;
}) => {
  const { dispatch } = store;

  dispatch(END);

  await store.sagaTask.toPromise();
};
