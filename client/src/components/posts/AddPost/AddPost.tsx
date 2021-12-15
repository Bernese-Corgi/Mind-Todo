import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DeleteDialog, Responsive } from 'components/common';
import { PostEditor, PostViewer } from '..';
import { StyledAddPostArticle } from './AddPost.styled';
import { RouteComponentProps, withRouter } from 'react-router';

interface AddPostParams {
  postId?: string;
  mindmapId?: string;
  nodeId?: string;
}

interface AddPostProps {
  post?: any;
  postErrMsg?: any;
  onWrite: (newPost) => void;
  onEdit: (updatePost) => void;
}

const AddPost = ({
  post,
  postErrMsg,
  onWrite,
  onEdit,
  history,
}: AddPostProps & RouteComponentProps<AddPostParams>) => {
  const initialState = {
    values: { title: '', body: '', tag: '' },
    errors: { title: '', body: '', tag: '', post: '' },
  };

  const dialogText = `변경 사항이 없습니다.\n수정을 종료하시겠습니까?`;
  const [hasDialog, setHasDialog] = useState(false);

  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState(initialState.errors);
  const [localTags, setLocalTags] = useState<Array<string>>([]);

  const [hasTitleChanged, setHasTitleChanged] = useState(false);
  const [hasBodyChanged, setHasBodyChanged] = useState(false);
  const [hasTagsChanged, setHasTagsChanged] = useState(false);

  useEffect(() => {
    setHasTitleChanged(post?.title !== values.title);
    setHasBodyChanged(post?.body !== values.body);
    setHasTagsChanged(post?.tags !== localTags);
  }, [
    localTags,
    post?.body,
    post?.tags,
    post?.title,
    values.body,
    values.title,
  ]);

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
      setLocalTags(prev => prev.filter((_, i) => i !== key));
    },
    closeDialog: () => {
      setHasDialog(false);
    },
  };

  const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (errors.title || errors.body || errors.post) return;

    if (post) {
      if (hasTitleChanged || hasBodyChanged || hasTagsChanged) {
        onEdit({ title: values.title, body: values.body, tags: localTags });
      } else {
        setHasDialog(true);
      }
    } else {
      onWrite({ title: values.title, body: values.body, tags: localTags });
    }
  };

  useEffect(() => {
    if (post) {
      setValues({ title: post.title, body: post.body, tag: '' });
      setLocalTags(post.tags);
    }
  }, [post]);

  useEffect(() => {
    if (postErrMsg) {
      setErrors({ ...errors, post: postErrMsg });
    }
  }, [postErrMsg]);

  return (
    <Responsive>
      <StyledAddPostArticle>
        <section className="section postEditor">
          <h3 className="postEditorHeader">글 작성</h3>
          <PostEditor
            values={values}
            errors={errors}
            localTags={localTags}
            onSubmit={handleSubmitPost}
            onChanges={handleChanges}
            onClicks={handleClicks}
          />
        </section>
        <section className="section postViewer">
          <h3 className="postEditorHeader">미리보기</h3>
          <PostViewer post={values} localTags={localTags} />
        </section>
        {hasDialog && (
          <DeleteDialog
            visible={hasDialog}
            delDialogText={dialogText}
            onClose={handleClicks.closeDialog}
            onConfirmDelete={handleClicks.cancelBtn}
          />
        )}
      </StyledAddPostArticle>
    </Responsive>
  );
};

export default withRouter(AddPost);
