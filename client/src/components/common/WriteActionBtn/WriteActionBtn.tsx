import React from 'react';
import { Button } from '..';
import { StyledWriteActionBtnSect } from './WriteActionBtn.styled';
import { ReactComponent as BookImg } from './assets/book.svg';

interface WriteActionBtnProps {
  path: string;
  id: string;
  title: string;
  descText?: string;
  btnText?: string;
}

const WriteActionBtn = ({
  path,
  id,
  title,
  descText,
  btnText,
}: WriteActionBtnProps) => {
  return (
    <StyledWriteActionBtnSect>
      <p className="descText">{descText}</p>
      <BookImg className="noDataImg" aria-label="비어있는 책 이미지" />
      <Button linkTo={path} id={id} title={title} children={btnText} textOnly />
    </StyledWriteActionBtnSect>
  );
};

export default WriteActionBtn;
