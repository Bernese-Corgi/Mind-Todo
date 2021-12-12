import { Responsive } from 'components/common';
import { PostViewerContainer } from 'container/posts';
import React from 'react';
import { withRouter } from 'react-router';

const PostPage = ({ match, history }) => {
  const { postId } = match.params;
  return (
    <Responsive>
      <PostViewerContainer postId={postId} />
    </Responsive>
  );
};

export default withRouter(PostPage);
