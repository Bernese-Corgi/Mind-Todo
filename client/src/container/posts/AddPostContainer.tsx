import React, { useEffect, useState } from 'react';
import { AddPost } from 'components/posts';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import {
  setPost,
  updatePostAsync,
  writePostAsync,
} from 'redux/modules/posts/post';
import { useReduxDispatch } from 'redux/store';
import { LoadingIcon } from 'components/common';
import { PostType } from 'utils/api/posts';

const AddPostContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { node, nodePost, post, postLoading, postError } = useSelector(
    ({ node, post }: RootState) => ({
      node: node.node?.node,
      nodePost: node.node?.post,
      post: post.post,
      postLoading: post.loading,
      postError: post.error,
    })
  );
  const { nodeId } = match.params;

  const [postErrMsg, setPostErrMsg] = useState('');

  const handleWrite = async (newPost: PostType) => {
    const newPostData = await dispatch(writePostAsync(nodeId, newPost));

    if (newPostData) {
      history.push(`/mindmap/${newPostData.mindmapId}/${newPostData.nodeId}`);
    }
  };

  const handleEdit = async (updatePost: PostType) => {
    const updatedPostData = await dispatch(
      updatePostAsync(post?._id, updatePost)
    );

    if (updatedPostData) {
      history.push(
        `/mindmap/${updatedPostData.mindmapId}/${updatedPostData.nodeId}`
      );
    }
  };

  useEffect(() => {
    if (postError) {
      const resData = postError.response.data;
      if (Array.isArray(resData.details)) {
        const resErrMsg = resData.details.map(e => e.message);
        setPostErrMsg(resErrMsg);
      }
    }
  }, [postError]);

  useEffect(() => {
    if (nodePost) {
      dispatch(setPost(nodePost));
    }
  }, [dispatch, nodePost, post]);

  if (postLoading) return <LoadingIcon />;

  return (
    <AddPost
      post={post}
      postErrMsg={postErrMsg}
      onWrite={handleWrite}
      onEdit={handleEdit}
    />
  );
};

export default AddPostContainer;
