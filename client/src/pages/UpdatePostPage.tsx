import React from 'react';
import { withRouter } from 'react-router';
import { UpdatePostContainer } from 'container/posts';

const UpdatePostPage = () => {
  return <UpdatePostContainer />;
};

export default withRouter(UpdatePostPage);
