import React from 'react';
import { Input, Button, MdEditor, ErrorMsg } from 'components/common';
import { StyledPostEditorForm } from './PostEditor.styled';

const PostEditor = ({ onSubmit, values, errors, onChanges, onClicks }) => (
  <StyledPostEditorForm onSubmit={onSubmit}>
    <Input
      id="postTitleInput"
      label="제목"
      type="text"
      name="title"
      value={values.title}
      errorMsg={errors.title}
      placeholder="제목을 입력해주세요."
      autoComplete="off"
      onChange={onChanges.title}
    />
    <MdEditor
      id="postBodyInput"
      label="내용"
      name="body"
      value={values.body}
      errorMsg={errors.body}
      placeholder="내용을 입력해주세요."
      onChange={onChanges.body}
    />
    <ErrorMsg className="formErrorMsg" children={errors.post} />
    <div className="btnWrapper">
      <Button
        id="cancelWritePost"
        title="글 작성 취소"
        onClick={onClicks.cancelBtn}
        round="round"
        children="취소"
      />
      <Button
        type="submit"
        id="submitPost"
        title="작성글 등록하기"
        primary
        round="round"
        children="등록"
      />
    </div>
  </StyledPostEditorForm>
);

export default PostEditor;
