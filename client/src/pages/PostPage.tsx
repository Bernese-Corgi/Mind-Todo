import { Responsive } from 'components/common';
import { PostViewerContainer } from 'container/posts';
import React from 'react';
import { withRouter } from 'react-router';

const PostPage = ({ match, history }) => {
  return (
    <Responsive>
      <PostViewerContainer />
    </Responsive>
  );
};

export default withRouter(PostPage);
