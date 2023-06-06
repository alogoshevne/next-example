import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';

import { uiActions } from '@bus/ui/actions';

import { styles } from './styles';

type ConfirmDeleteProps = {
  text: string;
  onConfirm: () => void;
  confirmButton?: {
    text?: string;
    icon?: any;
    disableIcon?: boolean;
  };
  cancelButton?: {
    text?: string;
    icon?: any;
  };
};

export const ConfirmOrCancel: React.FC<ConfirmDeleteProps> = ({
  onConfirm,
  text,
  confirmButton,
  cancelButton,
}) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <Box
      sx={styles.root}
      display={'flex'}
      flexDirection={'column'}
      m={'20px 70px 20px 70px'}
      alignItems={'center'}
      maxWidth={'306px'}
      gap={'29px'}>
      <Box>
        <Typography variant={'h5'}>{text}</Typography>
      </Box>
      <Box display={'flex'} gap={'10px'}>
        <Button onClick={closeModal} color={'secondary'}>
          {cancelButton?.text || 'Cancel'}
        </Button>
        <Button color={'primary'} onClick={onConfirm}>
          {confirmButton?.text || 'Delete'}
        </Button>
      </Box>
    </Box>
  );
};
