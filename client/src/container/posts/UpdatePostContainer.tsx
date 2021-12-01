import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { PostEditor } from 'components/posts';
import { withRouter } from 'react-router';
import { readPostAsync } from 'redux/modules/posts/post';
import { LoadingIcon } from 'components/common';

const UpdatePostContainer = ({ history, match }) => {
  const { postId } = match.params;

  const dispatch = useDispatch();
  const { post, postError, postLoading } = useSelector(
    ({ post }: RootState) => ({
      post: post.data,
      postError: post.error,
      postLoading: post.loading,
    })
  );

  const initialValues = {
    title: post?.title,
    body: post?.body,
    tag: '',
  };
  console.log(initialValues);

  const initialErrors = {
    title: '',
    body: '',
    tag: '',
    post: '',
  };

  const initialLocalTags = [];

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [localTags, setLocalTags] = useState(initialLocalTags);

  const handleChanges = {
    title: (e: ChangeEvent<HTMLInputElement>) => {
      //
    },
    body: (e: ChangeEvent<HTMLTextAreaElement>) => {
      //
    },
    tag: (e: ChangeEvent<HTMLInputElement>) => {
      //
    },
  };

  const handleClicks = {
    addTagBtn: () => {
      //
    },
    removeTagBtn: (e, key) => {
      //
    },
    cancelBtn: () => {
      //
    },
  };

  const handleSubmit = () => {
    //
  };

  useEffect(() => {
    dispatch(readPostAsync(postId));
  }, [dispatch, postId]);

  if (postLoading) return <LoadingIcon />;

  return (
    <>
      <PostEditor
        onSubmit={handleSubmit}
        values={values}
        errors={errors}
        localTags={localTags}
        onChanges={handleChanges}
        onClicks={handleClicks}
      />
    </>
  );
};

export default withRouter(UpdatePostContainer);
