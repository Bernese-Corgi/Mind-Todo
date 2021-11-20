import { MindmapContainer } from 'container/mindmaps';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readNodeAsync } from 'redux/modules/mindmaps/nodes';
import { useReduxDispatch } from 'redux/store';

const NodeContainer = ({ match }) => {
  const dispatch = useReduxDispatch();
  const { mindmap, nodes } = useSelector((state: RootState) => state);

  const { mindmapId, nodeId } = match.params;

  useEffect(() => {
    dispatch(readNodeAsync(mindmapId, nodeId));

    return () => {
      //
    };
  }, [dispatch, mindmapId, nodeId]);

  return (
    <>
      <MindmapContainer />
    </>
  );
};

export default NodeContainer;
