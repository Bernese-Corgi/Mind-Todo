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

interface PostViewerContainerProps {
  nodePost?: any;
  nodeId?: string;
  mindmapId?: string;
  postId?: string;
}

const PostViewerContainer = ({
  nodePost,
  nodeId,
  mindmapId,
  postId,
  history,
}: PostViewerContainerProps & RouteComponentProps) => {
  const dispatch = useDispatch();
  const { post } = useSelector(({ post }: RootState) => ({
    post: post.post,
  }));

  const writePath = `/mindmap/${mindmapId}/${nodeId}/write-post`;

  useEffect(() => {
    if (!nodePost) {
      const dispatchReadPost = async (postId: string) => {
        await dispatch(readPostAsync(postId));
      };
      const post = postId && dispatchReadPost(postId);
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
    />
  );
};

export default withRouter(PostViewerContainer);
