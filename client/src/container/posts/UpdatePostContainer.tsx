import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

  // TODO initial value가 제대로 설정되도록 변경
  const initialValues = useMemo(
    () => ({
      title: '',
      body: '',
      tag: '',
    }),
    []
  );

  const initialErrors = {
    title: '',
    body: '',
    tag: '',
    post: '',
  };

  const initialLocalTags = post?.tags;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [localTags, setLocalTags] = useState(initialLocalTags);

  const handleChanges = {
    title: (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    body: (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    tag: (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
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

  /* 내용의 초기값을 이전에 입력된 내용으로 설정 ------------------------ */
  // body가 변경될 때마다 작성한 useEffect에 등록한 함수가 호출된다.
  // -> 컴포넌트가 마운트되고 나서 단 한번만 useEffect에 등록한 작업이 실행되도록 설정해야 한다.
  // useRef로 마운트 상태에 따라 작업을 처리하도록 설정할 수 있다.
  const mounted = useRef(false);
  useEffect(() => {
    // 마운트된 상태면 return - 밑의 코드들을 실행하지 않는다.
    if (mounted.current) return;
    // 마운트된 상태이므로 mounted.current를 true로 설정
    mounted.current = true;
    // quill 에디터의 현재 html에 이전에 입력된 값 body를 입력한다. (에디터 내부 값의 초기값을 이전의 입력된 내용으로 설정)
    initialValues.title = post?.title;
    initialValues.body = post?.body;
    // initialLocalTags = post?.tags;
  }, [initialValues, post?.body, post?.title]);
  // 위의 방법 말고, 의존성 배열을 비워도 해결된다.

  if (!post?.title || !post?.body) return null;

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
