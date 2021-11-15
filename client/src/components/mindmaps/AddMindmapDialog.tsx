import { Button, Dialog, Input } from 'components/common';
import { StyledForm } from 'components/common/Dialog/Dialog.styled';
import React, { ChangeEvent, FormEvent } from 'react';
import { Mindmap } from 'utils/api/mindmaps';

interface AddMindmapDialogProps {
  values: Mindmap;
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickCancel: () => void;
  onClose: () => void;
}

const AddMindmapDialog = ({
  values,
  errorMessage,
  onSubmit,
  onChange,
  onClickCancel,
  onClose,
}: AddMindmapDialogProps) => {
  return (
    <Dialog visible onClose={onClose}>
      <>
        {/* <StyledForm> */}
        <form id="writeMindmap" onSubmit={onSubmit}>
          <h2>마인드맵 생성하기</h2>
          <Input
            id="mindmapTitle"
            label="마인드맵 제목"
            name="mindmapTitle"
            value={values?.title}
            placeholder="마인드맵 제목을 입력하세요."
            autoComplete="off"
            onChange={onChange}
          />
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
          <Button round="round" onClick={onClickCancel}>
            취소
          </Button>
          <Button form="writeMindmap" type="submit" round="round" primary>
            확인
          </Button>
        </form>
        {/* </StyledForm> */}
      </>
    </Dialog>
  );
};

export default AddMindmapDialog;
