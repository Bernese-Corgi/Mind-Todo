import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readMindmapAsync } from 'redux/modules/mindmaps/mindmap';
import { NodeRoute } from 'components/node';
import { NodeType } from 'utils/api/mindmaps';

interface NodeRouteContainerProps {
  node: Partial<NodeType>;
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

  const isSetRoute = useRef<boolean>();

  // 첫 마운트 시에만 실행
  useEffect(() => {
    node.name && setNodeRoute(node.name);
    isSetRoute.current = true;
  }, []);

  useEffect(() => {
    node.mindmapId && dispatch(readMindmapAsync(node.mindmapId));
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
        isSetRoute.current = false;
      }
    }
  }, [addParentName, mindmapData, node._id, node.name]);

  // if (isSetRoute.current) return <p>a</p>;

  return <NodeRoute content={nodeRoute} />;
};

export default NodeRouteContainer;
