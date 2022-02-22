import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { MindmapItem } from 'components/mindmaps/MindmapList/MindmapList';
import { Carousel, LoadingIcon } from 'components/common';

interface MindmapCarouselContainerProps {
  //
}

const MindmapCarouselContainer = ({}: MindmapCarouselContainerProps) => {
  const dispatch = useDispatch();

  const { mindmaps } = useSelector(({ mindmaps }: RootState) => ({
    mindmaps: mindmaps.mindmaps,
    loading: mindmaps.loading,
    error: mindmaps.error,
  }));

  useEffect(() => {
    dispatch(listMindmapAsync());
  }, [dispatch]);

  console.log(mindmaps);

  const CarouselItem = data => {
    return <MindmapItem mindmap={data} />;
  };

  if (!mindmaps) return <LoadingIcon />;

  return (
    <>
      {/* {mindmaps?.map((mindmap, i) => (
        <MindmapItem mindmap={mindmap} key={i} />
      ))} */}
      <Carousel datas={mindmaps} />
    </>
  );
};

export default MindmapCarouselContainer;
