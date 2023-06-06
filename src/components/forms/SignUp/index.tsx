import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field, FormRenderProps } from 'react-final-form';

import { Box, Button } from '@mui/material';

import { RenderEmailField } from '@components/forms/SignUp/fields/RenderEmailField';
import { RenderFirstNameField } from '@components/forms/SignUp/fields/RenderFirstNameField';
import { RenderLastNameField } from '@components/forms/SignUp/fields/RenderLastNameField';
import { RenderPasswordField } from '@components/forms/SignUp/fields/RenderPasswordField';
import { RenderRepeatPasswordField } from '@components/forms/SignUp/fields/RenderRepeatPasswordField';
import { schema } from '@components/forms/SignUp/schema';

// RENDER_FIELDS

export const SignUp = (props: FormRenderProps) => {
  return (
    <form noValidate onSubmit={props.handleSubmit}>
      <Box width={500} display={'flex'} flexDirection={'column'}>
        <Field name={'first_name'} component={RenderFirstNameField} />
        <Field name={'last_name'} component={RenderLastNameField} />
        <Field name={'email'} component={RenderEmailField} />
        <Field name={'password'} component={RenderPasswordField} />
        <Field name={'repeat_password'} component={RenderRepeatPasswordField} />
        {/*FIELDS*/}
        <Box my={1}>
          <Button type={'submit'} role={'submit'}>
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default SignUp;
export { SignUp as SignUpForm, schema };
