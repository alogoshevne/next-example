import { call } from 'redux-saga/effects';

type ErrorType = {
  status_code: number;
  details: {
    code?: string;
    detail: string;
  };
};

export function* throwError(response: any) {
  const error: Error = yield call([response, 'json']);

  throw new Error(error.message, {
    cause: { status: response.status, error } as unknown as Error,
  });
}
