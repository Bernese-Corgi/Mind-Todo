import { PostViewer } from 'components/posts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import {
  readPostAsync,
  removePostAsync,
  unloadPost,
} from 'redux/modules/posts/post';
import { PostType } from 'utils/api/posts';

interface PostViewerParams {
  mindmapId?: string;
  nodeId?: string;
  postId?: string;
}

interface PostViewerContainerProps {
  nodePost?: PostType;
}

const PostViewerContainer = ({
  nodePost,
  history,
  match,
}: PostViewerContainerProps & RouteComponentProps<PostViewerParams>) => {
  const dispatch = useDispatch();
  const { post, currentUser, loading, error } = useSelector(
    ({ post, user }: RootState) => ({
      post: post.post,
      currentUser: user.user,
      loading: post.loading,
      error: post.error,
    })
  );

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

  const handleRemove = async () => {
    if (post) {
      // Post Page인 경우
      await dispatch(removePostAsync(post._id));
      // Post List 페이지로 이동
      history.push('/posts');
    } else if (nodePost) {
      // Node Paged인 경우
      const { _id, mindmapId, nodeId } = nodePost;
      _id && (await dispatch(removePostAsync(_id)));
      // 노드 상세 페이지로 이동
      history.push(`/mindmap/${mindmapId}/${nodeId}`);
    }
  };

  return (
    <PostViewer
      post={nodePost ? nodePost : post}
      currentUser={currentUser}
      hasEdit
      onRemove={handleRemove}
      writePath={writePath}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(PostViewerContainer);
