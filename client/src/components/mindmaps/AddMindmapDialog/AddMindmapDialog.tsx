import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Dialog, InputField } from 'components/common';
import { MindmapType } from 'utils/api/mindmaps';
import {
  addMindmapDialogStyle,
  AddMindmapDialogWrapper,
  StyledMindmapForm,
} from './AddMindmapDialog.styled';

export interface AddMindmapDialogProps {
  visible?: boolean;
  error;
  onWrite: (newMindmapValues: MindmapType) => void;
  onClose?: () => void;
}

const AddMindmapDialog = ({
  visible,
  error,
  onWrite,
  onClose,
}: AddMindmapDialogProps) => {
  const [values, setValues] = useState({
    title: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValues({ ...values, title: value });

    if (values.title) {
      setErrorMsg('');
      return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.title) {
      setErrorMsg('마인드맵 제목을 입력해주세요');
      return;
    }

    if (values.title.length > 30) {
      setErrorMsg('마인드맵 제목은 30자 이하로 입력해주세요');
    }

    if (values.title && values.title.length <= 30) {
      onWrite(values);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMsg('마인드맵 생성에 실패했습니다. 다시 시도해주세요');
      return;
    }
  }, [error]);

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      label="writeMindmap"
      wrapperStyle={addMindmapDialogStyle}>
      <AddMindmapDialogWrapper>
        <h2>마인드맵 생성</h2>
        <StyledMindmapForm id="writeMindmap" onSubmit={handleSubmit}>
          <InputField
            id="mindmapTitle"
            label="마인드맵 제목"
            name="mindmapTitle"
            value={values?.title}
            placeholder="마인드맵 제목을 입력하세요."
            autoComplete="off"
            onChange={handleChangeTitle}
            hideLabel
            errorMsg={errorMsg}
          />
          <div className="addMindmapDialogBtnWrapper">
            <Button
              id="addMindmapBtn"
              title="마인드맵 생성하기"
              form="writeMindmap"
              type="submit"
              round="round"
              primary
              children="확인"
            />
            <Button
              id="cancelBtn"
              title="마인드맵 생성 취소"
              round="round"
              onClick={onClose}
              children="취소"
            />
          </div>
        </StyledMindmapForm>
      </AddMindmapDialogWrapper>
    </Dialog>
  );
};

export default AddMindmapDialog;
