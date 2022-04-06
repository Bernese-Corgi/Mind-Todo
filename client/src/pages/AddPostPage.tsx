import React from 'react';
import { withRouter } from 'react-router';
import { Responsive } from 'components/common';
import { AddPostContainer } from 'container/posts';

const AddPostPage = ({ history, match }) => {
  return (
    <main>
      <Responsive>
        <AddPostContainer history={history} match={match} />
      </Responsive>
    </main>
  );
};

export default withRouter(AddPostPage);
