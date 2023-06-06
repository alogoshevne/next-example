import { FinalFormTypes } from '@core/FinalForm/typedefs';
import { ServerSidePayload } from '@setup/typedefs';

const prepareActions = {
  movePromiseToMeta: ({
    values,
    resolve,
    reject,
  }: FinalFormTypes.OnFormSubmitPayload) => {
    return {
      payload: values,
      meta: {
        resolve,
        reject,
      },
    };
  },
  toServerSide: ({ token, ...payload }: ServerSidePayload<unknown>) => {
    return {
      payload,
      meta: {
        token: token,
      },
    };
  },
};

export default prepareActions;
