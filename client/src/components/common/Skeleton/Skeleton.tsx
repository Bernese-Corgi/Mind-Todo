import React from 'react';
import { StyledSkeletonElem } from './Skeleton.styled';

export type SkeletonTypes =
  | 'text'
  | 'img'
  | 'title'
  | 'date'
  | 'subInfo'
  | 'todos'
  | 'post';

interface SkeletonProps {
  types: SkeletonTypes[];
}

const Skeleton = ({ types }: SkeletonProps) => {
  return (
    <>
      {types.map(type => {
        return <StyledSkeletonElem type={type} />;
      })}
    </>
  );
};

export default Skeleton;
