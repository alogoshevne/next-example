import { VariantType, useSnackbar } from 'notistack';

import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useDispatch } from 'react-redux';

import { FinalFormTypes } from '@core/FinalForm/typedefs';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
} from '@reduxjs/toolkit';

import { asyncValidate } from './asyncValidate';

type FinalFormProps = {
  initialValues?: Record<string, any>;
  component: (props: FormRenderProps) => React.ReactNode;
  onSubmit?: FinalFormTypes.OnFormSubmit;
  sagaAction?:
    | ActionCreatorWithPayload<FinalFormTypes.OnFormSubmitPayload>
        | ActionCreatorWithPreparedPayload<
        [payload: any],
        unknown,
        any,
        unknown,
        unknown
      >;
  onSubmitSuccess?: (showSnackbar: ShowSnackbar) => void;
  onSuccessMessage?: string | { message: string; variant: VariantType };
  onSubmitFailure?: (errors: any, showSnackbar: ShowSnackbar) => void;
  skipErrorMessage?: boolean;
  schema: any;
};
export type ShowSnackbar = (message?: string, variant?: VariantType) => void;

const FinalForm: React.FC<FinalFormProps> = ({
  initialValues = {},
  component,
  onSubmit,
  sagaAction,
  schema,
  onSubmitSuccess,
  onSuccessMessage,
  onSubmitFailure,
}) => {
  const validate = asyncValidate(schema);
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar: ShowSnackbar = (
    message = 'Form submitted successfully',
    variant = 'infoSnackbar',
  ) => {
    enqueueSnackbar(message, { variant });
  };

  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    return new Promise((resolve, reject) => {
      sagaAction && dispatch(sagaAction({ values, resolve, reject }));
      onSubmit && onSubmit({ values, resolve, reject });
    })
      .then(() => {
        onSubmitSuccess && onSubmitSuccess(showSnackbar);
        if (onSuccessMessage) {
          typeof onSuccessMessage === 'string'
            ? showSnackbar(onSuccessMessage)
            : showSnackbar(onSuccessMessage.message, onSuccessMessage.variant);
        }
      })
      .catch((errors) => {
        onSubmitFailure && onSubmitFailure(errors, showSnackbar);

        return errors;
      });
  };

  return (
    <Form
      initialValues={initialValues}
      mutators={ {
        ...arrayMutators,
      } }
      validate={validate}
      onSubmit={handleSubmit}
      render={(props) => {
        return component(props);
      }}
    />
  );
};

export default FinalForm;
