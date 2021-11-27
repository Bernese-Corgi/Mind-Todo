import { Responsive } from 'components/common';
import React from 'react';
import { PostEditor, PostViewer } from '..';
import { StyledAddPostArticle } from './AddPost.styled';

const AddPost = ({
  values,
  errors,
  localTags,
  onSubmit,
  onChanges,
  onClicks,
}) => {
  return (
    <Responsive>
      <StyledAddPostArticle>
        <section className="section postEditor">
          <h3 className="postEditorHeader">글 작성</h3>
          <PostEditor
            values={values}
            errors={errors}
            localTags={localTags}
            onSubmit={onSubmit}
            onChanges={onChanges}
            onClicks={onClicks}
          />
        </section>
        <section className="section postViewer">
          <h3 className="postEditorHeader">미리보기</h3>
          <PostViewer post={values} localTags={localTags} />
        </section>
      </StyledAddPostArticle>
    </Responsive>
  );
};

export default AddPost;
