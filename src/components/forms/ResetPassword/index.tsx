import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field, FormRenderProps } from 'react-final-form';

import { Box, Button } from '@mui/material';

import { RenderPasswordField } from '@components/forms/ResetPassword/fields/RenderPasswordField';
import { RenderRepeatPasswordField } from '@components/forms/ResetPassword/fields/RenderRepeatPasswordField';

// RENDER_FIELDS

export const ResetPassword = (props: FormRenderProps) => {
  return (
    <form noValidate onSubmit={props.handleSubmit}>
      <Box width={500} display={'flex'} flexDirection={'column'}>
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
export default ResetPassword;
