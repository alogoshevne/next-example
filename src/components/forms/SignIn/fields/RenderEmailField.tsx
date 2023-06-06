import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box, TextField } from '@mui/material';

import { getFieldError } from '@core/FinalForm/getFieldError';

export const RenderEmailField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  return (
    <Box my={1}>
      <TextField
        inputProps={{
          autoComplete: 'username',
          'data-testid': 'sign-in-email',
        }}
        required
        fullWidth
        label={'Email'}
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
        {...input}
      />
    </Box>
  );
};
