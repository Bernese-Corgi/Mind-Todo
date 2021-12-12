/* ---------------------------------- react --------------------------------- */
import React, { useEffect } from 'react';
/* ---------------------------------- redux --------------------------------- */
import { useSelector } from 'react-redux';
import { useReduxDispatch } from 'redux/store';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  readMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { writeNodeAsync } from 'redux/modules/mindmaps/node';
/* -------------------------------- component ------------------------------- */
import { LoadingIcon } from 'components/common';
/* ---------------------------------- utils --------------------------------- */
import { withRouter } from 'react-router';
import MindmapDetail from 'components/mindmaps/MindmapDetail/MindmapDetail';

const MindmapContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { mindmap, mindmapLoading, node, nodeLoading, nodeError } = useSelector(
    ({ mindmap, node }: RootState) => ({
      mindmap: mindmap.mindmap,
      mindmapLoading: mindmap.loading,
      mindmapError: mindmap.error,
      node: node.node,
      nodeLoading: node.loading,
      nodeError: node.error,
    })
  );

  const { mindmapId } = match.params;

  useEffect(() => {
    async function dispatchReadMindmap(mindmapId) {
      await dispatch(readMindmapAsync(mindmapId));
    }
    dispatchReadMindmap(mindmapId);

    return () => {
      dispatch(initializeMindmapForm());
    };
  }, [dispatch, mindmapId]);

  const handleWrite = async newNode => {
    await dispatch(writeNodeAsync(mindmapId, newNode));
    dispatch(readMindmapAsync(mindmapId));
  };

  if (mindmapLoading) return <LoadingIcon />;

  if (!mindmap) return <LoadingIcon />;

  return (
    <>
      <MindmapDetail mindmap={mindmap} onWrite={handleWrite} />
    </>
  );
};

export default withRouter(MindmapContainer);
