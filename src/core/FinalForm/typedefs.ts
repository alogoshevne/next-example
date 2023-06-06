import { PayloadAction } from '@reduxjs/toolkit';

export namespace FinalFormTypes {
  export type PromiseResolve = (value?: unknown) => void;
  export type PromiseReject = (reason?: any) => void;
  export type ResolveReject = {
    resolve: PromiseResolve;
    reject: PromiseReject;
  };
  export type OnFormSubmitPayload = {
    resolve: PromiseResolve;
    reject: PromiseReject;
    values: any;
  };
  export type OnFormSubmit = (payload: OnFormSubmitPayload) => void;
  export type PayloadActionWithPromiseMeta<T> = PayloadAction<
    T,
    string,
    ResolveReject
  >;
}
