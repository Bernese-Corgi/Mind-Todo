import React from 'react';
import { Responsive } from 'components/common';
import { PostListContainer } from 'container/posts';

const PostListPage = () => {
  return (
    <main>
      <Responsive>
        <PostListContainer />
      </Responsive>
    </main>
  );
};

export default PostListPage;
