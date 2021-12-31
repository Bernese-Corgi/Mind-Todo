import { NodeRoute } from 'components/node';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readMindmapAsync } from 'redux/modules/mindmaps/mindmap';

interface NodeRouteContainerProps {
  node: {
    _id: string;
    name: string;
    mindmapId: string;
  };
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

  const [nodeRoute, setNodeRoute] = useState<string>(node.name);

  const isSettingRoute = useRef<boolean>();

  useEffect(() => {
    dispatch(readMindmapAsync(node.mindmapId));
  }, [dispatch, node._id, node.mindmapId]);

  const addParentName = useCallback(
    matchNode => {
      // TODO 탈출 조건 : parent가 null
      if (!matchNode.parent) return;

      setNodeRoute(prev =>
        prev.includes(matchNode.parent.name)
          ? prev
          : matchNode.parent.name + ' > ' + prev
      );

      // TODO parent의 parent 찾기
      const parentOfParent = mindmapData.body.find(
        obj => obj.node._id === matchNode.parent._id && obj
      );

      // TODO parent를 나열해서 setNodeRoute에 설정
      if (parentOfParent) {
        addParentName(parentOfParent);
      }
    },
    [mindmapData?.body]
  );

  useEffect(() => {
    if (mindmapData && mindmapData?.body) {
      const matchNode = mindmapData.body.find(
        obj => obj.node?._id === node._id && obj
      );

      if (matchNode) {
        addParentName(matchNode);
      }
    }
  }, [addParentName, mindmapData, node._id, node.name]);

  return <NodeRoute content={nodeRoute} />;
};

export default NodeRouteContainer;
