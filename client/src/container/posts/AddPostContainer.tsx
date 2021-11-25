import { AddPost, PostEditor, PostViewer } from 'components/posts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { writePostAsync } from 'redux/modules/posts/post';
import { useReduxDispatch } from 'redux/store';

const AddPostContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { node, post, postError } = useSelector(
    ({ node, post }: RootState) => ({
      node: node.data?.node,
      post: node.data?.post,
      postError: post.error,
    })
  );
  const { mindmapId, nodeId } = match.params;

  const initialState = {
    values: { title: '', body: '' }, // TODO tag 값 추가
    errors: { title: '', body: '', post: '' },
  };

  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState(initialState.errors);

  /* ------------------------------ click button ------------------------------ */
  const handleClicks = {
    cancelBtn: () => {
      setValues(initialState.values);
      history.goBack();
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
    // TODO tag 이벤트 추가
  };

  const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = await dispatch(
      writePostAsync(nodeId, {
        title: values.title,
        body: values.body,
        // TODO tag 값 추가
      })
    );

    if (newPost) {
      history.push(`/mindmap/${mindmapId}/${nodeId}`);
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

  return (
    <>
      <AddPost
        values={values}
        errors={errors}
        onSubmit={handleSubmitPost}
        onChanges={handleChanges}
        onClicks={handleClicks}
      />
    </>
  );
};

export default AddPostContainer;
