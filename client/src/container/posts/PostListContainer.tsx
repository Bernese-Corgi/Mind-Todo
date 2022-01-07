import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import { listPostsAsync } from 'redux/modules/posts/posts';
import { PostList } from 'components/posts';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, currentUser, loading, error } = useSelector(
    ({ posts, user }: RootState) => ({
      posts: posts.posts,
      currentUser: user.user,
      loading: posts.loading,
      error: posts.loading,
    })
  );

  useEffect(() => {
    const { tag, username } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listPostsAsync({ username, tag }));
  }, [dispatch, location.search]);

  return (
    <PostList
      currentUser={currentUser}
      posts={posts}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(PostListContainer);
