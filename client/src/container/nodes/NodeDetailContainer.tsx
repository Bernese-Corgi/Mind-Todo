import React, { useEffect } from 'react';
import { NodeDetail } from 'components/node';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import {
  readNodeAsync,
  removeNodeAsync,
  updateNodeAsync,
} from 'redux/modules/mindmaps/node';
import {
  readMindmapAsync,
  removeMindmapAsync,
  updateMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';

const NodeDetailContainer = ({ history, match }) => {
  const { mindmapId, nodeId } = match.params;

  const dispatch = useDispatch();
  const { mindmap, node, nodeLoading, nodeError, post, todos } = useSelector(
    ({ mindmap, node }: RootState) => ({
      mindmap: mindmap.mindmap,
      node: node.node,
      nodeLoading: node.loading,
      nodeError: node.error,
      post: node.post,
      todos: node.todos,
    })
  );

  const links = {
    mindmap: `/mindmap/${mindmapId}`,
  };

  const handleEdit = {
    nodeName: async (updateNodeName: string) => {
      await dispatch(
        updateNodeAsync(mindmapId, nodeId, { ...node, name: updateNodeName })
      );
      dispatch(readMindmapAsync(mindmapId));
      dispatch(readNodeAsync(mindmapId, nodeId));
    },
    mindmapTitle: async (updateMindmapTitle: string) => {
      await dispatch(
        updateMindmapAsync(mindmapId, { title: updateMindmapTitle })
      );
      await dispatch(
        updateNodeAsync(mindmapId, nodeId, {
          ...node,
          name: updateMindmapTitle,
        })
      );
      await dispatch(readMindmapAsync(mindmapId));
      dispatch(readNodeAsync(mindmapId, nodeId));
    },
  };

  const handleRemove = {
    nodeName: async () => {
      dispatch(removeNodeAsync(mindmapId, nodeId));
      await dispatch(readMindmapAsync(mindmapId));
      history.push(`/mindmap/${mindmapId}`);
    },
    mindmapTitle: () => {
      dispatch(removeMindmapAsync(mindmapId));
      dispatch(listMindmapAsync());
      history.push('/mindmaps');
    },
  };

  const handleCloseNodePage = () => {
    history.push(`/mindmap/${mindmapId}`);
  };

  useEffect(() => {
    // const dispatchReadNode = async () => {
    //   await dispatch(readNodeAsync(mindmapId, nodeId));
    // };
    // dispatchReadNode();
    dispatch(readNodeAsync(mindmapId, nodeId));
  }, [dispatch, mindmapId, nodeId]);

  return (
    <NodeDetail
      links={links}
      nodeId={nodeId}
      mindmap={mindmap}
      node={node}
      post={post}
      todos={todos}
      loading={nodeLoading}
      error={nodeError}
      onEdit={handleEdit}
      onRemove={handleRemove}
      onCloseNodePage={handleCloseNodePage}
    />
  );
};

export default withRouter(NodeDetailContainer);
