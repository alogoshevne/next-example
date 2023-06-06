import React from 'react';

import { Box } from '@mui/material';

import { styles } from './styles';

export type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box component={'main'} sx={styles.root}>
      <Box component={'div'} sx={styles.content}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
