import React, { useEffect } from 'react';
import { Button, LoadingIcon } from 'components/common';
import { MindmapList } from 'components/mindmaps';
import { useDispatch, useSelector } from 'react-redux';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { RootState } from 'redux/modules';

const MindmapListContainer = () => {
  const dispatch = useDispatch();
  const mindmaps = useSelector((state: RootState) => state.mindmaps);

  useEffect(() => {
    dispatch(listMindmapAsync());
  }, [dispatch]);

  if (mindmaps.loading) return <LoadingIcon />;

  return (
    <div>
      <Button linkTo="/mindmaps/create-mindmap" primary>
        마인드맵 생성하기
      </Button>
      <MindmapList
        mindmaps={mindmaps.data}
        loading={mindmaps.loading}
        error={mindmaps.error}
      />
    </div>
  );
};

export default MindmapListContainer;
