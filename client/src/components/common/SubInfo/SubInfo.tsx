import React from 'react';
import { Link } from 'react-router-dom';
import { chunkDateString } from 'utils/stringUtils';
import { SubInfoWrapper } from './SubInfo.styled';

interface SubInfoProps {
  isOwnPost?: boolean;
  writer?: string;
  writtenDate?: string;
}

const SubInfo = ({ isOwnPost, writer, writtenDate }: SubInfoProps) => {
  const chunkedDate = writtenDate && chunkDateString(writtenDate);

  return (
    <SubInfoWrapper className="subInfoWrapper">
      {writer &&
        (isOwnPost ? (
          <p className="writer">{writer}</p>
        ) : (
          <Link className="writer writerLink" to={`/posts?username=${writer}`}>
            {writer}
          </Link>
        ))}
      {writtenDate && <time className="writtenDate">{chunkedDate}</time>}
    </SubInfoWrapper>
  );
};

export default SubInfo;
