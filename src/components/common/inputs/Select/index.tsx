import React, { FC, FocusEventHandler } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { IOption } from '@setup/typedefs';

type SelectProps = {
  options: IOption[];
  value: IOption;
  label: string;
  onChange: (event: SelectChangeEvent<IOption>, child: React.ReactNode) => void;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  checked?: boolean;
  multiple?: boolean;
  equalTo?: string;
  error?: boolean;
  helperText?: string;
  ['data-testid']?: string;
  required?: boolean;
  fullWidth?: boolean;
  loadMore?: () => void;
  sx?: SxProps<Theme>;
};

export const Select: FC<SelectProps> = ({
  options,
  value,
  label,
  fullWidth,
  error,
  helperText,
  required,
  sx,
  ...props
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      sx={{
        minWidth: 120,
        ...sx,
      }}
      error={error}>
      <InputLabel>{`${label}${required ? ' *' : ''}`}</InputLabel>
      <MuiSelect value={value} label={label} required={required} {...props}>
        {options.map((option) => (
          <MenuItem key={option.id} value={JSON.stringify(option)}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
