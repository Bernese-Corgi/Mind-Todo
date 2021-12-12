import { AddPost } from 'components/posts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import {
  readPostAsync,
  updatePostAsync,
  writePostAsync,
} from 'redux/modules/posts/post';
import { useReduxDispatch } from 'redux/store';

const AddPostContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { node, nodePost, post, postError } = useSelector(
    ({ node, post }: RootState) => ({
      node: node.node?.node,
      nodePost: node.node?.post,
      post: post.data,
      postError: post.error,
    })
  );
  const { mindmapId, nodeId } = match.params;

  const initialState = {
    values: { title: '', body: '', tag: '' },
    errors: { title: '', body: '', tag: '', post: '' },
  };

  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState(initialState.errors);
  const [localTags, setLocalTags] = useState<Array<string>>([]);

  /* ------------------------------ click button ------------------------------ */
  const handleClicks = {
    cancelBtn: () => {
      setValues(initialState.values);
      history.goBack();
    },
    addTagBtn: () => {
      if (!values.tag) {
        setErrors({ ...errors, tag: '태그를 입력하세요.' });
        return;
      }

      if (values.tag.length > 20) return;

      setLocalTags([...localTags, values.tag]);

      setValues({ ...values, tag: '' });
    },
    removeTagBtn: (e, key) => {
      localTags.splice(key, 1);
    },
  };

  const handleChanges = {
    title: (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValues({ ...values, [name]: value });

      if (values.title.length > 30) {
        setErrors({
          ...errors,
          title: '제목의 글자 수는 30자를 넘기지 않아야 합니다.',
        });
      }

      if (values.title && values.title.length <= 30) {
        setErrors({ ...errors, title: '' });
      }
    },
    body: (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setValues({ ...values, [name]: value });

      if (values.body) {
        setErrors({ ...errors, body: '' });
      }
    },
    tag: (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValues({ ...values, [name]: value });

      values.tag.length > 20
        ? setErrors({ ...errors, tag: '태그는 20자 이하로 입력해주세요.' })
        : setErrors({ ...errors, tag: '' });
    },
  };

  console.log(post);
  const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.title || errors.body || errors.post) return;
    if (post) {
      const updatedPost = await dispatch(
        updatePostAsync(post?._id, {
          title: values.title,
          body: values.body,
          tags: localTags,
        })
      );

      if (updatedPost) {
        history.push(`/mindmap/${post?.mindmapId}/${post?.nodeId}`);
      }
    }

    if (!post) {
      const newPost = await dispatch(
        writePostAsync(nodeId, {
          title: values.title,
          body: values.body,
          tags: localTags,
        })
      );

      if (newPost) {
        history.push(`/mindmap/${mindmapId}/${nodeId}`);
      }
    }
  };

  useEffect(() => {
    // error
    if (postError) {
      if (!values.title && !values.body) {
        setErrors({
          ...errors,
          title: '제목을 입력해주세요.',
          body: '내용을 입력해주세요.',
        });
      }

      if (!values.title && values.body) {
        setErrors({
          ...errors,
          title: '제목을 입력해주세요.',
          body: '',
        });
      }

      if (values.title && !values.body) {
        setErrors({
          ...errors,
          title: '',
          body: '내용을 입력해주세요.',
        });
      }

      if (values.title && values.body) {
        setErrors({ ...errors, post: '등록에 실패했습니다.' });
      }
    }
  }, [postError, values.body, values.title]);

  useEffect(() => {
    if (node?.post) {
      dispatch(readPostAsync(node.post));
    }
  }, [dispatch, node?.post]);

  useEffect(() => {
    if (post) {
      setValues({
        title: post?.title,
        body: post?.body,
        tag: '',
      });
      setLocalTags(post?.tags);
    }
  }, [post]);

  return (
    <AddPost
      values={values}
      errors={errors}
      localTags={localTags}
      onSubmit={handleSubmitPost}
      onChanges={handleChanges}
      onClicks={handleClicks}
    />
  );
};

export default AddPostContainer;
