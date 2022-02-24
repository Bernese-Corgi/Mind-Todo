import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { MindmapItem } from 'components/mindmaps/MindmapList/MindmapList';
import { Carousel, Heading, LoadingIcon } from 'components/common';
import { Link } from 'react-router-dom';

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

  if (!mindmaps) return <LoadingIcon />;

  return (
    <>
      <Heading>
        <Link to={`/mindmaps`}>나의 마인드맵</Link>
      </Heading>
      <Carousel slidesToShow={3} centerMode={true}>
        {mindmaps.map((mindmap, i) => (
          <MindmapItem mindmap={mindmap} key={i} />
        ))}
      </Carousel>
    </>
  );
};

export default MindmapCarouselContainer;
