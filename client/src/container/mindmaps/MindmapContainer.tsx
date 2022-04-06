/* ---------------------------------- react --------------------------------- */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
/* ---------------------------------- redux --------------------------------- */
import { useSelector } from 'react-redux';
import { useReduxDispatch } from 'redux/store';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  readMindmapAsync,
  removeMindmapAsync,
  updateMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import {
  readNodeAsync,
  updateNodeAsync,
  writeNodeAsync,
} from 'redux/modules/mindmaps/node';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
/* -------------------------------- component ------------------------------- */
import { LoadingIcon } from 'components/common';
import { MindmapDetail } from 'components/mindmaps';
/* ---------------------------------- utils --------------------------------- */
import { findRootNode } from 'utils/mindmap';
import { NodeType } from 'utils/api/mindmaps';

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

  const handleEdit = async (updateMindmapTitle: string) => {
    const rootNode = findRootNode(mindmap)?.node as NodeType;

    if (rootNode._id) {
      await dispatch(
        updateMindmapAsync(mindmapId, { title: updateMindmapTitle })
      );
      await dispatch(
        updateNodeAsync(mindmapId, rootNode._id, {
          ...rootNode,
          name: updateMindmapTitle,
        })
      );
      await dispatch(readMindmapAsync(mindmapId));
    }
  };

  const handleRemove = () => {
    dispatch(removeMindmapAsync(mindmapId));
    dispatch(listMindmapAsync());
    history.push('/mindmaps');
  };

  if (mindmapLoading) return <LoadingIcon />;

  if (!mindmap) return <LoadingIcon />;

  return (
    <>
      <MindmapDetail
        mindmap={mindmap}
        onWrite={handleWrite}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    </>
  );
};

export default withRouter(MindmapContainer);
