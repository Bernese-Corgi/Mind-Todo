import { AddPostContainer } from 'container/posts';
import React from 'react';
import { withRouter } from 'react-router';

const AddPostPage = ({ history, match }) => {
  console.log(match);
  return (
    <>
      <AddPostContainer history={history} match={match} />
    </>
  );
};

export default withRouter(AddPostPage);
