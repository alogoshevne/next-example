import { SnackbarContent } from 'notistack';

import React, { forwardRef } from 'react';

import { Typography } from '@mui/material';

type InfoSnackbarProps = {
  message: React.ReactNode;
};

const InfoSnackbar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  InfoSnackbarProps
> = ({ message }, ref) => {
  return (
    <SnackbarContent ref={ref} style={{ width: '100%' }}>
      <Typography variant={'h5'}>{message}</Typography>
    </SnackbarContent>
  );
};
export default forwardRef<HTMLDivElement, InfoSnackbarProps>(InfoSnackbar);
