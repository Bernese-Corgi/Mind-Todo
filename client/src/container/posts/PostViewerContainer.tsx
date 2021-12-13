import { WriteActionBtn } from 'components/common';
import { PostViewer } from 'components/posts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter, WithRouterProps } from 'react-router';
import { RootState } from 'redux/modules';
import {
  readPostAsync,
  removePostAsync,
  unloadPost,
} from 'redux/modules/posts/post';

interface PostViewerParams {
  mindmapId?: string;
  nodeId?: string;
  postId?: string;
}

interface PostViewerContainerProps {
  nodePost?: any;
}

const PostViewerContainer = ({
  nodePost,
  // nodeId,
  // mindmapId,
  // postId,
  history,
  match,
}: PostViewerContainerProps & RouteComponentProps<PostViewerParams>) => {
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector(({ post }: RootState) => ({
    post: post.post,
    loading: post.loading,
    error: post.error,
  }));

  const { mindmapId, nodeId, postId } = match.params;

  const writePath = `/mindmap/${mindmapId}/${nodeId}/write-post`;

  useEffect(() => {
    if (!nodePost && postId) {
      dispatch(readPostAsync(postId));
    }

    return () => {
      // dispatch(unloadPost());
    };
  }, [dispatch, nodePost, postId]);

  const handleRemove = () => {
    postId && dispatch(removePostAsync(postId));
    history.push('/posts');
  };

  return (
    <PostViewer
      post={nodePost ? nodePost : post}
      hasEdit
      onRemove={handleRemove}
      writePath={writePath}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(PostViewerContainer);
