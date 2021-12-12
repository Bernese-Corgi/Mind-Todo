import React from 'react';
import { Button, Dialog } from '..';
import { deleteDialogStyle } from './DeleteDialog.styled';

interface DeleteDialogProps {
  visible: boolean;
  delDialogText?: string;
  onClose: () => void;
  onConfirmDelete?: () => void;
}

const DeleteDialog = ({
  visible,
  delDialogText = '정말 삭제하시겠습니까?',
  onClose,
  onConfirmDelete,
}: DeleteDialogProps) => {
  const handleClicks = {
    close: () => {
      onClose();
    },
    cancel: () => {
      onClose();
    },
    confirm: () => {
      onConfirmDelete && onConfirmDelete();
      onClose();
    },
  };

  return (
    <Dialog
      visible={visible}
      onClose={handleClicks.close}
      wrapperStyle={deleteDialogStyle}
      // onDimClickClose={() => {}}
    >
      <div className="delDialogBody">
        <pre>{delDialogText}</pre>
        <div className="delDialogBtns">
          <Button
            id="confirmRemove"
            title="삭제하기"
            children="확인"
            onClick={handleClicks.confirm}
            round="round"
            primary
          />
          <Button
            id="cancelRemove"
            title="삭제 취소"
            children="취소"
            round="round"
            onClick={handleClicks.cancel}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
