import React from 'react';
import { chunkDateString } from 'utils/stringUtils';
import { SubInfoWrapper } from './SubInfo.styled';

interface SubInfoProps {
  writer?: string;
  writtenDate?: string;
}

const SubInfo = ({ writer, writtenDate }: SubInfoProps) => {
  const chunkedDate = writtenDate && chunkDateString(writtenDate);

  return (
    <SubInfoWrapper className="subInfoWrapper">
      {writer && <p className="writer">{writer}</p>}
      {writtenDate && <time className="writtenDate">{chunkedDate}</time>}
    </SubInfoWrapper>
  );
};

export default SubInfo;
