import { NodeContainer } from 'container/nodes';
import React from 'react';
import { withRouter } from 'react-router';

const NodePage = ({ match }) => {
  return (
    <>
      <NodeContainer match={match} />
    </>
  );
};

export default withRouter(NodePage);
