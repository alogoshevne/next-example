import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  Theme,
  Typography,
  TypographyTypeMap,
} from '@mui/material';

import { IOption } from '@setup/typedefs';

type RadioGroupProps = {
  label?: string;
  defaultValue?: string;
  values: IOption[];
  value?: string;
  onChange: (value: IOption) => void;
  ['data-testid']?: string;
  error?: boolean;
  helperText?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  labelVariant?: TypographyTypeMap['props']['variant'];
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  values,
  defaultValue,
  error,
  helperText,
  color = 'primary',
  labelVariant = 'body1',
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <FormControl>
        <FormLabel id={`${props['data-testid']}-label`}>{label}</FormLabel>
        <MuiRadioGroup
          {...props}
          value={value}
          onChange={(event, value) => {
            onChange(JSON.parse(value));
          }}
          aria-labelledby={`${props['data-testid']}-label`}
          defaultValue={''}
          data-testid={props['data-testid']}>
          {values.map((value) => (
            <FormControlLabel
              color={error ? 'error' : color}
              key={value.id}
              value={JSON.stringify(value)}
              control={
                <Radio
                  sx={{
                    svg: {
                      '& path': {
                        fill: ({ palette }: Theme) =>
                          error ? palette.error.main : palette[color].main,
                      },
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant={labelVariant}
                  color={error ? 'error' : color}>
                  {value.label}
                </Typography>
              }
            />
          ))}
        </MuiRadioGroup>
      </FormControl>
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
};
