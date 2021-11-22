import React from 'react';
import { Button } from '..';
import { StyledWriteActionBtnSect } from './WriteActionBtn.styled';
import { ReactComponent as BookImg } from './assets/book.svg';

interface WriteActionBtnProps {
  path: string;
  text?: string;
}

const WriteActionBtn = ({
  path,
  text = '아직 작성된 글이 없습니다.',
}: WriteActionBtnProps) => {
  return (
    <StyledWriteActionBtnSect>
      <BookImg className="noDataImg" aria-label="비어있는 책 이미지" />
      <p className="text">{text}</p>
      <Button
        linkTo={path}
        id="goToWritePostPage"
        title="글 작성하러 가기"
        children="글 작성하러 가기"
        textOnly
      />
    </StyledWriteActionBtnSect>
  );
};

export default WriteActionBtn;
