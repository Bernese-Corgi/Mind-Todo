import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readMindmapAsync } from 'redux/modules/mindmaps/mindmap';
import { NodeRoute } from 'components/node';
import { NodeType } from 'utils/api/mindmaps';
import { findMatchNodeByMindmapBody, getNodeRoute } from 'utils/mindmap';

interface NodeRouteContainerProps {
  node?: Partial<NodeType>;
}

const NodeRouteContainer = ({ node }: NodeRouteContainerProps) => {
  const dispatch = useDispatch();
  const { mindmapData, loading, error } = useSelector(
    ({ mindmap }: RootState) => ({
      mindmapData: mindmap.mindmap,
      loading: mindmap.loading,
      error: mindmap.error,
    })
  );

  const [nodeRoute, setNodeRoute] = useState<string>('');

  useEffect(() => {
    if (node) {
      node.mindmapId && dispatch(readMindmapAsync(node.mindmapId));
    }
  }, [dispatch, node]);

  useEffect(() => {
    if (mindmapData && mindmapData?.body && node) {
      const matchNode = findMatchNodeByMindmapBody(node, mindmapData.body);

      if (matchNode) {
        const route = getNodeRoute(matchNode, mindmapData.body, '>');

        setNodeRoute(route);
      }
    }
  }, [mindmapData, node]);

  return <NodeRoute content={nodeRoute} />;
};

export default NodeRouteContainer;
