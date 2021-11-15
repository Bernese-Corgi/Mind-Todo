import { MindmapContainer } from 'container/mindmaps';
import { Route } from 'react-router';

const MindmapPage = () => {
  return (
    <>
      <Route component={MindmapContainer} path="/mindmap/:mindmapId" />
    </>
  );
};

export default MindmapPage;
