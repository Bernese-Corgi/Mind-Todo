import React, { useEffect } from 'react';
import Mindmap from 'components/mindmaps/Mindmap';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  readMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { Button } from 'components/common';

const MindmapContainer = ({ history, match }) => {
  const dispatch = useDispatch();
  const { mindmap } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(readMindmapAsync(match.params.mindmapId));
  }, []);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <>
      <Mindmap mindmap={mindmap.data} />
      <Button linkTo="/mindmaps" onClick={handleClick}>
        뒤로가기
      </Button>
    </>
  );
};

export default withRouter(MindmapContainer);
