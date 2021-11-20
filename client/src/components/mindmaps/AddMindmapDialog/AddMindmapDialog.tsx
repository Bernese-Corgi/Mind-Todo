import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Dialog, ErrorMsg, Input } from 'components/common';
import { Mindmap } from 'utils/api/mindmaps';
import {
  addMindmapDialogStyle,
  AddMindmapDialogWrapper,
  StyledMindmapForm,
} from './AddMindmapDialog.styled';

export interface AddMindmapDialogProps {
  values?: Mindmap;
  errorMessage?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickCancel?: () => void;
  onClose?: () => void;
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
    <Dialog
      visible
      onClose={onClose}
      label="writeMindmap"
      wrapperStyle={addMindmapDialogStyle}>
      <AddMindmapDialogWrapper>
        <h2>마인드맵 생성</h2>
        <StyledMindmapForm id="writeMindmap" onSubmit={onSubmit}>
          <Input
            id="mindmapTitle"
            label="마인드맵 제목"
            name="mindmapTitle"
            value={values?.title}
            placeholder="마인드맵 제목을 입력하세요."
            autoComplete="off"
            onChange={onChange}
            hideLabel
            errorMsg={!!errorMessage}
          />
          <ErrorMsg>{errorMessage}</ErrorMsg>
          <div className="addMindmapDialogBtnWrapper">
            <Button
              id="cancelBtn"
              title="마인드맵 생성 취소"
              round="round"
              onClick={onClickCancel}
              children="취소"
            />
            <Button
              id="addMindmapBtn"
              title="마인드맵 생성하기"
              form="writeMindmap"
              type="submit"
              round="round"
              primary
              children="확인"
            />
          </div>
        </StyledMindmapForm>
      </AddMindmapDialogWrapper>
    </Dialog>
  );
};

export default AddMindmapDialog;
