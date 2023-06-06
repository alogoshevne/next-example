import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box, TextField } from '@mui/material';

import { getFieldError } from '@core/FinalForm/getFieldError';

export const RenderLastNameField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  return (
    <Box my={1}>
      <TextField
        inputProps={{
          'data-testid': 'sign-up-last-name',
        }}
        required
        fullWidth
        label={'Last Name'}
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
        {...input}
      />
    </Box>
  );
};
