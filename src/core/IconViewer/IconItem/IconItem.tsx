import React, { ReactNode } from 'react';

import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { styles } from '@core/IconViewer/IconItem/styles';

export type FontSizeType = 'small' | 'inherit' | 'medium' | 'large' | 'custom';
export type ColorType =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'custom';

interface IconProps {
  component: React.ElementType;
  currentFontSize: FontSizeType;
  currentColor: ColorType;
  htmlColor?: string;
  customFontSize?: string;
  onChangeFontSize: (
    event: SelectChangeEvent<
      'small' | 'inherit' | 'medium' | 'large' | 'custom'
    >,
    child: ReactNode,
  ) => void;
  onChangeCustomFontSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (
    event: SelectChangeEvent<
      | 'custom'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning'
    >,
  ) => void;
  onChangeHtmlColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function IconItem(props: IconProps) {
  const {
    component: Component,
    currentFontSize,
    currentColor,
    htmlColor,
    customFontSize,
    onChangeFontSize,
    onChangeCustomFontSize,
    onChangeColor,
    onChangeHtmlColor,
  } = props;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.preview}>
        {Component && (
          <Component
            fontSize={
              currentFontSize !== 'custom'
                ? (currentFontSize as any)
                : undefined
            }
            color={
              currentColor !== 'custom' ? (currentColor as any) : undefined
            }
            htmlColor={currentColor === 'custom' ? htmlColor : undefined}
            sx={{
              fontSize:
                currentFontSize === 'custom' ? customFontSize : undefined,
            }}
          />
        )}
      </Box>
      <Box flexDirection={'column'} display={'flex'} mr={1} flex={1} p={2}>
        <Box display={'flex'}>
          <FormControl sx={{ flex: 1, mr: 1 }}>
            <FormLabel id="demo-radio-buttons-group-label">Font Size</FormLabel>
            <Select
              value={currentFontSize}
              onChange={onChangeFontSize}
              fullWidth
              size={'small'}>
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'large'}>Large</MenuItem>
              <MenuItem value={'custom'}>Custom</MenuItem>
            </Select>
            {currentFontSize === 'custom' && (
              <TextField
                sx={{ mt: 1 }}
                size={'small'}
                value={customFontSize}
                onChange={onChangeCustomFontSize}
                fullWidth
                placeholder={customFontSize}
              />
            )}
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
            <Select
              value={currentColor}
              onChange={onChangeColor}
              fullWidth
              size={'small'}>
              <MenuItem value={'primary'}>Primary</MenuItem>
              <MenuItem value={'secondary'}>Secondary</MenuItem>
              <MenuItem value={'error'}>Error</MenuItem>
              <MenuItem value={'info'}>Info</MenuItem>
              <MenuItem value={'success'}>Success</MenuItem>
              <MenuItem value={'warning'}>Warning</MenuItem>
              <MenuItem value={'custom'}>Custom</MenuItem>
            </Select>
            {currentColor === 'custom' && (
              <TextField
                sx={{ mt: 1 }}
                size={'small'}
                value={htmlColor}
                onChange={onChangeHtmlColor}
                fullWidth
                placeholder={htmlColor}
              />
            )}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
