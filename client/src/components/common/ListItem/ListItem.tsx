import React from 'react';
import { Link } from 'react-router-dom';
import { chunkDateString } from 'utils/stringUtils';
import { StyledListItem, StyledSubInfo } from './ListItem.styled';

export type ListItemLinksType = {
  title?: string;
  username?: string;
};

interface ListItemProps {
  title: string;
  username?: string;
  createdAt?: string;
  body?: string;
  links?: ListItemLinksType;
  className?: string;
}

const ListItem = ({
  title,
  username,
  createdAt,
  body,
  links,
  className,
}: ListItemProps) => {
  const createdDate = createdAt && chunkDateString(createdAt);

  return (
    <StyledListItem className={className}>
      {links?.title ? (
        <Link to={links?.title} className="title">
          {title}
        </Link>
      ) : (
        <p className="title">{title}</p>
      )}
      <StyledSubInfo>
        {links?.username ? (
          <Link to={links?.username} className="username">
            {username}
          </Link>
        ) : (
          <p className="username">{username}</p>
        )}
        {createdAt && <time className="date">{createdDate}</time>}
      </StyledSubInfo>
      {body && <p className="body">{body}</p>}
    </StyledListItem>
  );
};

export default ListItem;
