import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LoadingIcon } from 'components/common';
import { AddMindmapDialog } from 'components/mindmaps';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  writeMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { useReduxDispatch } from 'redux/store';

const AddMindmapDialogContainer = ({ history }) => {
  const dispatch = useReduxDispatch();
  const { mindmap } = useSelector((state: RootState) => state);

  const [values, setValues] = useState({
    title: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(initializeMindmapForm());
  }, [dispatch]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValues({ ...values, title: value });

    if (values.title) {
      setError('');
      return;
    }
  };

  const handleClick = {
    // 닫기 버튼 클릭
    closeDialog: () => {
      dispatch(initializeMindmapForm());
      history.goBack();
    },

    // 취소 버튼 클릭
    cancelButton: () => {
      dispatch(initializeMindmapForm());
      history.goBack();
    },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.title) {
      setError('마인드맵 제목을 입력해주세요');
      return;
    }

    const newMindmap = await dispatch(writeMindmapAsync(values));

    if (newMindmap) {
      history.push(`/mindmap/${newMindmap._id}`);
    }
  };

  useEffect(() => {
    if (mindmap.error) {
      setError('마인드맵 생성에 실패했습니다. 다시 시도해주세요');
      return;
    }
  }, [dispatch, history, mindmap.data, mindmap.error]);

  if (mindmap.loading) return <LoadingIcon />;

  return (
    <>
      <AddMindmapDialog
        values={values}
        errorMessage={error}
        onSubmit={handleSubmit}
        onChange={handleChangeTitle}
        onClickCancel={handleClick.cancelButton}
        onClose={handleClick.closeDialog}
      />
    </>
  );
};

export default withRouter(AddMindmapDialogContainer);
