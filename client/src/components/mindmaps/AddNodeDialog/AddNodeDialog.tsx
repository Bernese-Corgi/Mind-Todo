import { Button, Dialog } from 'components/common';
import { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface AddNodeDialogProps {
  visible: boolean;
  errorMsg?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClose: () => void;
}

const addNodeDialogStyle = `
  background: ${theme.colors.white};
  border-radius: ${theme.borders.radius.square};
  width: 30vw;
  min-width: 280px;
  min-height: 120px;
  padding: 0;
  font-size: ${theme.fonts.size.sm}  
  `;

const AddNodeDialogWrapper = styled.div`
  ${theme.flexes.mixin('column', 'start', 'start')}
  width: 100%;
  height: 100%;
  padding: 1.2em;
  color: ${theme.colors.gray.dark};

  h3 {
    font-size: 0.85em;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
  }

  .errorMessage {
    font-size: 0.8em;
    color: ${theme.colors.red};
    margin-top: 0.5em;
    margin-left: 0.5em;
  }
`;

const StyledAddNodeForm = styled.form`
  ${theme.flexes.row('start')}
  font-size: ${theme.fonts.size.sm};
  width: 100%;

  textarea {
    width: 100%;
    /* margin-top: 0.5em; */
    padding: 0.5em;
    border: 1px solid transparent;
    border-bottom: 1px solid ${theme.colors.gray.base}40;
    border-radius: ${theme.borders.radius.square};
    color: ${theme.colors.gray.dark};
    ${theme.transition()}

    &:hover {
      background-color: ${theme.colors.gray.light}30;
    }

    &:focus {
      border: 1px solid ${theme.colors.gray.dark}80;
      outline: none;
    }
  }
`;

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
          />
          <Button shape="confirm" type="submit" />
        </StyledAddNodeForm>
        <span className="errorMessage">{errorMsg}</span>
      </AddNodeDialogWrapper>
    </Dialog>
  );
};

export default AddNodeDialog;
