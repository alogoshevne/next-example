import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { styles } from './styles';

export type AuthLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box component={'main'} sx={styles.root}>
      <Box component={'div'} sx={styles.content}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
