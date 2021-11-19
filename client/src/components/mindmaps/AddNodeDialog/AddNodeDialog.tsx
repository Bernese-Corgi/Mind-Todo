import { Button, Dialog, ErrorMsg } from 'components/common';
import { ChangeEvent, FormEvent } from 'react';
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

const AddNodeDialog = ({
  visible,
  errorMsg,
  onSubmit,
  onChangeInput,
  onClose,
}: AddNodeDialogProps) => {
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
        <h3>노드 추가하기</h3>
        <StyledAddNodeForm onSubmit={onSubmit}>
          <textarea
            name="writeNode"
            id="writeNode"
            // value={}
            placeholder="추가할 노드의 이름을 입력하세요."
            autoComplete="off"
            onChange={onChangeInput}
            className={`${!!errorMsg && 'errorTextArea'}`}
          />
          <Button shape="confirm" type="submit" />
        </StyledAddNodeForm>
        <ErrorMsg>{errorMsg}</ErrorMsg>
      </AddNodeDialogWrapper>
    </Dialog>
  );
};

export default AddNodeDialog;
