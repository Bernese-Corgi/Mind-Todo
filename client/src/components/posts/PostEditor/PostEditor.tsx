import { Input, Button, MdEditor } from 'components/common';
import React from 'react';
import { PostEditorWrapper } from './PostEditor.styled';

const PostEditor = ({ onSubmit, values, errors, onChanges, onClicks }) => {
  return (
    <PostEditorWrapper>
      <form onSubmit={onSubmit}>
        <Input
          id="postTitleInput"
          label="제목"
          type="text"
          name="title"
          value={values.title}
          errorMsg={errors.body}
          placeholder="제목을 입력하세요."
          autoComplete="off"
          onChange={onChanges.title}
        />
        <MdEditor
          id="postBodyInput"
          label="내용"
          name="body"
          value={values.body}
          onChange={onChanges.body}
        />
        <Button
          id="cancelWritePost"
          title="글 작성 취소"
          onClick={onClicks.cancelBtn}
          children="취소"
        />
        <Button
          type="submit"
          id="submitPost"
          title="작성글 등록하기"
          primary
          children="등록"
        />
      </form>
    </PostEditorWrapper>
  );
};

export default PostEditor;
