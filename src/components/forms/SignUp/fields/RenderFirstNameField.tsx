import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box, TextField } from '@mui/material';

import { getFieldError } from '@core/FinalForm/getFieldError';

export const RenderFirstNameField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  return (
    <Box my={1}>
      <TextField
        inputProps={{
          'data-testid': 'sign-up-first-name',
        }}
        required
        fullWidth
        label={'First Name'}
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
        {...input}
      />
    </Box>
  );
};
