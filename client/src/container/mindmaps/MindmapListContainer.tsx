import React, { useEffect } from 'react';
import { MindmapList } from 'components/mindmaps';
import { useDispatch, useSelector } from 'react-redux';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { RootState } from 'redux/modules';

const MindmapListContainer = () => {
  const dispatch = useDispatch();
  const { mindmaps, loading, error } = useSelector(
    ({ mindmaps }: RootState) => ({
      mindmaps: mindmaps.data,
      loading: mindmaps.loading,
      error: mindmaps.error,
    })
  );

  useEffect(() => {
    dispatch(listMindmapAsync());
  }, [dispatch]);

  return <MindmapList mindmaps={mindmaps} loading={loading} error={error} />;
};

export default MindmapListContainer;
