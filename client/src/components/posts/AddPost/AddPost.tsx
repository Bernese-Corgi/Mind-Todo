import { Responsive } from 'components/common';
import React from 'react';
import { PostEditor, PostViewer } from '..';
import { StyledAddPostArticle } from './AddPost.styled';

const AddPost = ({ values, errors, onSubmit, onChanges, onClicks, match }) => {
  return (
    <Responsive>
      <StyledAddPostArticle>
        <section className="section postEditor">
          <h3>글 작성</h3>
          <PostEditor
            values={values}
            errors={errors}
            onSubmit={onSubmit}
            onChanges={onChanges}
            onClicks={onClicks}
          />
        </section>
        <section className="section postViewer">
          <h3>미리보기</h3>
          <PostViewer post={values} params={match.params} />
        </section>
      </StyledAddPostArticle>
    </Responsive>
  );
};

export default AddPost;
