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
import { readNodeAsync, writeNodeAsync } from 'redux/modules/mindmaps/node';
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

  const { mindmapId, nodeId } = match.params;

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
    const newNodeData = await dispatch(writeNodeAsync(mindmapId, newNode));

    if (nodeId) {
      dispatch(readMindmapAsync(mindmapId));
      dispatch(readNodeAsync(mindmapId, nodeId));
      history.push(`/mindmap/${mindmapId}/${newNodeData.node._id}`);
    } else {
      dispatch(readMindmapAsync(mindmapId));
    }
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
