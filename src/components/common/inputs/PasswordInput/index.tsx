import React from 'react';

import VisibilityToggleOnIcon from '@mui/icons-material/Visibility';
import VisibilityToggleOffIcon from '@mui/icons-material/VisibilityOff';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

export type PasswordFieldProps = {
  setShowPassword: (bool: boolean) => void;
  showPassword: boolean;
} & TextFieldProps;

export const PasswordInput: React.FC<PasswordFieldProps> = ({
  showPassword,
  setShowPassword,
  ...props
}) => {
  return (
    <TextField
      required
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
              }}
              edge="end">
              {showPassword ? (
                <VisibilityToggleOnIcon />
              ) : (
                <VisibilityToggleOffIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
