import { NodeContainer } from 'container/nodes';
import React from 'react';
import { withRouter } from 'react-router';

const NodePage = ({ history, match }) => {
  return (
    <>
      <NodeContainer history={history} match={match} />
    </>
  );
};

export default withRouter(NodePage);
