import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import { listPostsAsync } from 'redux/modules/posts/posts';
import { PostList } from 'components/posts';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(({ posts }: RootState) => ({
    posts: posts.posts,
    loading: posts.loading,
    error: posts.loading,
  }));

  useEffect(() => {
    const { tag, username } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listPostsAsync({ username, tag }));
  }, [dispatch, location.search]);

  return <PostList posts={posts} loading={loading} error={error} />;
};

export default withRouter(PostListContainer);
