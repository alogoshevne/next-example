import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react';

import {
  Box,
  MenuItem,
  Autocomplete as MuiAutocomplete,
  TextField,
} from '@mui/material';

import { IOption } from '@setup/typedefs';

type AutocompleteProps = {
  options: IOption[];
  label: string;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  value: string;
  checked?: boolean;
  multiple?: boolean;
  equalTo?: string;
  error?: boolean;
  helperText?: string;
  ['data-testid']?: string;
  required?: boolean;
  fullWidth?: boolean;
  loadMore?: () => void;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({ ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const { onChange, value, onBlur, onFocus, checked, name } = props;
  const fieldProps = {
    onBlur,
    onFocus,
    checked,
    name,
  };

  const handleScroll = (event: any) => {
    const listBoxNode = event.currentTarget;

    const position = listBoxNode.scrollTop + listBoxNode.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      props.loadMore?.();
    }
  };

  return (
    <MuiAutocomplete
      freeSolo
      fullWidth={props.fullWidth}
      data-testid={props['data-testid']}
      options={props.options}
      value={value}
      onChange={
        onChange
          ? (event, value) => {
              onChange(value as unknown as any);
            }
          : undefined
      }
      ListboxProps={{
        onScroll: handleScroll,
      }}
      renderOption={(props, option) => {
        return (
          <MenuItem {...props} key={option.id} data-testid={option.label}>
            {option.label}
          </MenuItem>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            variant="outlined"
            value={inputValue}
            required={props.required}
            onChange={(event) => setInputValue(event.target.value)}
            label={props.label}
            error={props.error}
            helperText={props.helperText}
            {...fieldProps}
            {...params}
          />
        );
      }}
    />
  );
};

export default Autocomplete;
