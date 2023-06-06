import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, Typography } from '@mui/material';

import { uiActions } from '@bus/ui/actions';
import { getIsModalOpen, getModalData } from '@bus/ui/selectors';

import { styles } from './styles';

type ModalsProps = {
  registeredModals: { [key: string]: React.FC };
};

export const Modals: React.FC<ModalsProps> = ({ registeredModals }) => {
  const modalData = useSelector(getModalData);
  const isOpen = useSelector(getIsModalOpen);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(uiActions.closeModal());
  };

  const closeModalOutside = () => {
    modalData!.modalPayload.isOutSideClicked &&
      dispatch(uiActions.closeModal());
  };

  return modalData ? (
    <Dialog
      onClose={closeModalOutside}
      open={isOpen}
      sx={styles.root}
      disableScrollLock>
      {modalData.modalPayload.title && (
        <Typography
          variant={'h1'}
          textAlign={modalData.modalPayload.titlePosition}>
          {modalData.modalPayload.title}
        </Typography>
      )}
      <Button
        sx={styles.closeButton}
        onClick={closeModal}
        startIcon={<CloseIcon />}
      />
      {registeredModals[modalData.modalName]
        ? React.createElement(
            registeredModals[modalData.modalName],
            modalData.modalPayload,
          )
        : React.createElement(
            'div',
            {},
            <>{`${modalData.modalName} is not registered`}</>,
          )}
    </Dialog>
  ) : null;
};
