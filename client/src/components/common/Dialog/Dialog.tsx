import React, { useEffect, useRef, useState } from 'react';
import { Button, Portal } from '..';
import {
  StyledDialogBody,
  StyledDialogCloseButton,
  StyledDim,
  StyledDialog,
} from './Dialog.styled';

type DialogProps = {
  hasModal?: boolean;
  visible?: boolean;
  portalId?: string;
  className?: string;
  onOpen?: (ref: HTMLElement | null) => void;
  onClose?: () => void;
  onDimClickClose?: () => void;
  label?: string;
  children?: React.ReactChild;
};

export type DialogWrapperProps = {
  wrapperStyle?: string;
};

const Dialog = ({
  hasModal = true,
  visible = false,
  onOpen,
  onClose,
  onDimClickClose,
  label,
  portalId = 'portal-root',
  children,
  wrapperStyle,
  ...restProps
}: DialogProps & DialogWrapperProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [modalMode] = useState(hasModal);

  useEffect(() => {
    // // visible이 true면 현재 dialogRef에 focus
    // visible && dialogRef.current?.focus();
    // // visible이 true이고 onOpen 함수가 전달되었으면 함수 실행
    // visible && onOpen && onOpen(dialogRef.current);
    // // visible이 false이고 onClose 함수가 전달되었으면 함수 실행
    // !visible && onClose && onClose();
  }, [onClose, onOpen, visible]);

  const handleClose = (e /* ANCHOR 타입 지정 */) => {
    if (e.target === e.currentTarget) {
      onDimClickClose && onDimClickClose();
    }
  };

  return (
    <Portal id={portalId}>
      <>
        {/* --------------------------------- dialog --------------------------------- */}
        {visible && (
          <>
            <StyledDialog
              role="dialog"
              ref={dialogRef}
              aria-label={label}
              aria-modal={modalMode}
              tabIndex={-1}
              wrapperStyle={wrapperStyle}
              {...restProps}>
              {/* ------------------------------- dialog body ------------------------------ */}
              <StyledDialogBody {...restProps}>{children}</StyledDialogBody>

              {/* ------------------------- close button container ------------------------- */}
              <StyledDialogCloseButton>
                <Button shape="cancel" onClick={onClose} />
              </StyledDialogCloseButton>
            </StyledDialog>

            {/* ----------------------------------- dim ---------------------------------- */}
            {modalMode && visible && (
              <StyledDim role="presentation" onClick={handleClose} />
            )}
          </>
        )}
      </>
    </Portal>
  );
};

export default Dialog;
