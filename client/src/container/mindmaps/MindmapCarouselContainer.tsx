import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { MindmapItem } from 'components/mindmaps/MindmapList/MindmapList';
import { Carousel, Heading, LoadingIcon } from 'components/common';
import { Link } from 'react-router-dom';
import { isEmptyArray } from 'utils/arrayUtils';

const MindmapCarouselContainer = () => {
  const dispatch = useDispatch();

  const { mindmaps, user } = useSelector(({ mindmaps, user }: RootState) => ({
    user: user.user,
    mindmaps: mindmaps.mindmaps,
    loading: mindmaps.loading,
    error: mindmaps.error,
  }));

  useEffect(() => {
    dispatch(listMindmapAsync());
  }, [dispatch]);

  if (!user) return null;

  if (!mindmaps) return <LoadingIcon />;

  return (
    <>
      <Heading className="sectionH2">
        <Link to={`/mindmaps`} style={{ marginLeft: '5em' }}>
          나의 마인드맵
        </Link>
      </Heading>
      {isEmptyArray(mindmaps) ? (
        <p>아직 작성한 마인드맵이 없습니다.</p>
      ) : (
        <Carousel slidesToShow={3} centerMode={true}>
          {mindmaps.map((mindmap, i) => (
            <MindmapItem mindmap={mindmap} key={i} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default MindmapCarouselContainer;
