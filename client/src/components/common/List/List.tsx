import React from 'react';
import { Link } from 'react-router-dom';
import { chunkDateString } from 'utils/stringUtils';
import { LoadingIcon } from '..';
import { StyledList, StyledListItem, StyledSubInfo } from './List.styled';

export type ListItemLinksType = {
  title?: string;
  username?: string;
};

interface ListItemProps {
  item: any;
  hasBody?: boolean;
  links?: ListItemLinksType;
}

interface ListProps {
  list: Array<any>;
  loading: boolean;
  error;
  links?: ListItemLinksType;
  hasBody?: boolean;
  className?: string;
}

const ListItem = ({ item, links, hasBody = false }: ListItemProps) => {
  console.log(item);
  const {
    _id,
    title,
    body,
    publisher: { username },
    createdAt,
  } = item;

  const createdDate = chunkDateString(createdAt);

  return (
    <StyledListItem>
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
      {hasBody && <p className="body">{body}</p>}
    </StyledListItem>
  );
};

const List = ({
  list,
  loading,
  error,
  links,
  hasBody,
  className,
}: ListProps) => {
  if (loading || !list) return <LoadingIcon />;
  if (error) return <p>에러</p>;

  return (
    <StyledList className={className}>
      {list.map((item, index) => (
        <ListItem
          key={item._id ? item._id : index}
          item={item}
          hasBody={hasBody}
        />
      ))}
    </StyledList>
  );
};

export default List;
