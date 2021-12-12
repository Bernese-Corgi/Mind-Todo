import React from 'react';
import { Responsive } from 'components/common';
import { PostListContainer } from 'container/posts';

const PostListPage = () => {
  return (
    <Responsive>
      <PostListContainer />
    </Responsive>
  );
};

export default PostListPage;
