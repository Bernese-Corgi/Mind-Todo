import { MindmapContainer } from 'container/mindmaps';
import { withRouter } from 'react-router';

const MindmapPage = ({ history, match }) => {
  return (
    <>
      <MindmapContainer history={history} match={match} />
    </>
  );
};

export default withRouter(MindmapPage);
