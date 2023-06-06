import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box } from '@mui/material';

import { Checkbox } from '@components/common/inputs/Checkbox';
import { getFieldError } from '@core/FinalForm/getFieldError';

export const RenderRememberMeField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  return (
    <Box my={1}>
      <Checkbox
        {...input}
        label={'Remember Me'}
        data-testid="sign-in-remember-me"
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
      />
    </Box>
  );
};
