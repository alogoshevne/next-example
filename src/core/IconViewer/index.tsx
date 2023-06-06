import React from 'react';

import { Alert, Box, Snackbar } from '@mui/material';

import { IconDialog } from '@core/IconViewer/IconDialog';
import components from '@core/IconViewer/components';

export default {
  title: 'icons',
  index: Box,
};

const styles = {
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    color: 'rgba(0, 0, 0, 0.6)',
    margin: '0px 4px',
  },
  icon: {
    padding: '17px',
    display: 'inline-block',
    margin: '4px 0px',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.87)',
      bgcolor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer',
    },
  },
  name: {
    flexGrow: 1,
    fontSize: '0.6rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    width: 0,
  },
};

export const IconViewer = () => {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [current, setCurrent] = React.useState<string>('');

  const handleClickOpen = (name: string) => {
    setOpen(true);
    setCurrent(name);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box>
        <Box component={'span'}>
          {Object.entries(components).map(([Icon, Component], index) => (
            <Box sx={styles.root} key={index}>
              <Box sx={styles.icon} onClick={() => handleClickOpen(Icon)}>
                <Component />
              </Box>
              <Box display={'flex'}>
                <Box sx={styles.name}>{Icon}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <IconDialog
        open={open}
        onClose={handleClose}
        current={current}
        setSnackbarOpen={setSnackbarOpen}
        renderString={`<${components[current]?.name} />`}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {'Text copied to clipboard'}
        </Alert>
      </Snackbar>
    </Box>
  );
};
