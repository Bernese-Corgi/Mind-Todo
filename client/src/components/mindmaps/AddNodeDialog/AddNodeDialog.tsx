import { Button, Dialog, ErrorMsg } from 'components/common';
import { ChangeEvent, FormEvent, forwardRef, useEffect, useRef } from 'react';
import {
  addNodeDialogStyle,
  AddNodeDialogWrapper,
  StyledAddNodeForm,
} from './AddNodeDialog.styled';

export interface AddNodeDialogProps {
  visible?: boolean;
  errorMsg?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClose?: () => void;
}

interface AddNodeTextareaProps {
  name: string;
  id: string;
  placeholder: string;
  autoComplete: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
}

const AddNodeTextarea = forwardRef<HTMLTextAreaElement, AddNodeTextareaProps>(
  (props, ref = null) => {
    return <textarea ref={ref} {...props} />;
  }
);

const AddNodeDialog = ({
  visible,
  errorMsg,
  onSubmit,
  onChangeInput,
  onClose,
}: AddNodeDialogProps) => {
  const writeNodeRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    visible && writeNodeRef && writeNodeRef.current?.focus();
  }, [visible]);

  return (
    <Dialog
      visible
      // onOpen
      onClose={onClose}
      // onDimClickClose
      label="writeNode"
      portalId="portal-root"
      wrapperStyle={addNodeDialogStyle}>
      <AddNodeDialogWrapper>
        <h3 className="dialogHead">노드 추가하기</h3>
        <StyledAddNodeForm onSubmit={onSubmit}>
          <AddNodeTextarea
            name="writeNode"
            id="writeNode"
            ref={writeNodeRef}
            placeholder="추가할 노드의 이름을 입력하세요."
            autoComplete="off"
            onChange={onChangeInput}
            className={`${!!errorMsg && 'errorInput'}`}
          />
          <Button
            id="addNodeBtn"
            title="노드 생성하기"
            shape="confirm"
            type="submit"
            className="addNodeBtn"
          />
        </StyledAddNodeForm>
        <ErrorMsg>{errorMsg}</ErrorMsg>
      </AddNodeDialogWrapper>
    </Dialog>
  );
};

export default AddNodeDialog;
