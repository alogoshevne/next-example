import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field, FormRenderProps } from 'react-final-form';

import { Box, Button, FormHelperText } from '@mui/material';

import { RenderEmailField } from '@components/forms/SignIn/fields/RenderEmailField';
import { RenderPasswordField } from '@components/forms/SignIn/fields/RenderPasswordField';
import { RenderRememberMeField } from '@components/forms/SignIn/fields/RenderRememberMeField';

import { schema } from './schema';

// RENDER_FIELDS

export const SignIn = (props: FormRenderProps) => {
  return (
    <form noValidate onSubmit={props.handleSubmit}>
      <Box width={500} display={'flex'} flexDirection={'column'}>
        <Field name={'email'} component={RenderEmailField} />
        <Field name={'password'} component={RenderPasswordField} />
        <Field
          name={'remember_me'}
          type="checkbox"
          component={RenderRememberMeField}
        />
        {/*FIELDS*/}
        {props.submitError && (
          <FormHelperText error>{props.submitError}</FormHelperText>
        )}
        <Box my={1}>
          <Button type={'submit'} role={'submit'}>
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default SignIn;

export { SignIn as SignInForm, schema };
