import React from 'react';

import {
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
  Theme,
  Typography,
  TypographyTypeMap,
} from '@mui/material';

type CheckboxProps = {
  checked?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onChange?: (e: boolean) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  labelVariant?: TypographyTypeMap['props']['variant'];
};

export const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  label,
  error,
  helperText,
  labelVariant = 'body1',
  checked,
  color = 'primary',
  ...props
}) => {
  return (
    <>
      <FormControlLabel
        {...props}
        checked={checked}
        control={
          <MuiCheckbox
            className={'checkbox'}
            sx={{
              svg: {
                '& path': {
                  fill: ({ palette }: Theme) =>
                    error ? palette.error.main : palette[color].main,
                },
              },
            }}
            onClick={() => {
              onChange && onChange(!checked);
            }}
          />
        }
        label={
          label && (
            <Typography variant={labelVariant} color={error ? 'error' : color}>
              {label}
            </Typography>
          )
        }
      />
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
};
