import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import {
  InputField,
  Button,
  MdEditor,
  ErrorMsg,
  TagForm,
} from 'components/common';
import { StyledPostEditorForm } from './PostEditor.styled';

interface PostEditorProps {
  values: {
    title: string;
    body: string;
    tag: string;
  };
  errors: {
    title: string;
    body: string;
    tag: string;
    post: string;
  };
  localTags: string[];
  onChanges: {
    title: (e: ChangeEvent<HTMLInputElement>) => void;
    body: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    tag: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  onClicks: {
    addTagBtn: () => void;
    removeTagBtn: (e, key) => void;
    cancelBtn: () => void;
  };
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  editorRef?: RefObject<HTMLTextAreaElement>;
}

const PostEditor = ({
  onSubmit,
  values,
  errors,
  localTags,
  onChanges,
  onClicks,
  editorRef,
}: PostEditorProps) => (
  <StyledPostEditorForm onSubmit={onSubmit}>
    <InputField
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
      editorRef={editorRef}
    />
    <TagForm
      id="postTagInput"
      label="태그"
      name="tag"
      value={values.tag}
      errorMsg={errors.tag}
      localTags={localTags}
      placeholder="태그를 입력해주세요."
      onChange={onChanges.tag}
      onClicks={onClicks}
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
