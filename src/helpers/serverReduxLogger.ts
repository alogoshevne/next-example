import { developmentLogger } from './logger';

export const serverReduxLogger =
  () => (next: (arg0: any) => void) => (action: { type: any }) => {
    developmentLogger.info(`Dispatch ${action.type}`);

    next(action);
  };
