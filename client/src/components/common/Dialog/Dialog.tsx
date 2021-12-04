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
                <Button
                  id={`close-${label}Button`}
                  title={`${label} 다이얼로그 닫기`}
                  shape="cancel"
                  onClick={onClose}
                />
              </StyledDialogCloseButton>
            </StyledDialog>

            {/* ----------------------------------- dim ---------------------------------- */}
            {modalMode && visible && (
              <StyledDim
                role="presentation"
                onClick={onDimClickClose ? onDimClickClose : onClose}
              />
            )}
          </>
        )}
      </>
    </Portal>
  );
};

export default Dialog;
