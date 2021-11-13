import AddMindmapDialog from 'components/mindmaps/AddMindmapDialog';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import { finishLoading } from 'redux/modules/loading';
import {
  initializeMindmapForm,
  writeMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { Mindmap } from 'utils/api/mindmaps';

const AddMindmapDialogContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { mindmap, loading } = useSelector((state: RootState) => state);

  const [values, setValues] = useState<Mindmap>({
    title: '',
  });

  const [error, setError] = useState('');

  // useEffect(() => {
  //   console.log('useEffect 첫번째');
  //   dispatch(initializeMindmapForm());
  // }, []);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, title: e.target.value });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(initializeMindmapForm());

    console.log('handle Submit');

    if (!values.title) {
      setError('마인드맵 제목을 입력해주세요');
      return;
    }

    dispatch(writeMindmapAsync(values));

    console.log(mindmap.data);

    // if (mindmap.data) {
    //   console.log(
    //     'mindmap data가 있니??? 그럼 history push가 실행된단다',
    //     mindmap.data
    //   );
    //   history.push(`/mindmap/${mindmap.data?._id}`);
    // }

    console.log(finishLoading('mindmap/WRITE_MINDMAP'));
  };

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    console.log('useEffect 두번째');
    if (mindmap.error) {
      setError('마인드맵 생성에 실패했습니다. 다시 시도해주세요');
      return;
    }

    // write mindmap이 잘 됐으면 history.push('/:mindmapsId')
  }, [dispatch, history, mindmap.data, mindmap.error]);

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
