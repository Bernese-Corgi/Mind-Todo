import React from 'react';
import qs from 'qs';
import { Heading, ListItem, LoadingIcon } from 'components/common';
import styled from 'styled-components';
import theme from 'styles/theme';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserType } from 'utils/api/auth';

interface PostListProps {
  posts: any;
  currentUser?: UserType;
  loading: boolean;
  error;
}

const PostListWrapper = styled.section`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;

  h2 {
    font-size: 1.1em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
    margin: 1em 2em 2em 1em;
  }
`;

const PostList = ({
  posts,
  currentUser,
  loading,
  error,
  location,
}: PostListProps & RouteComponentProps) => {
  const { tag, username } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const isMyPost = currentUser?.username === username;

  if (loading) return <LoadingIcon />;

  if (!posts) return <p>데이터 없음</p>;

  if (error) return <p>오류 발생</p>;

  return (
    <PostListWrapper>
      {tag && <Heading children={`# ${tag}`} />}
      {username && (
        <Heading children={isMyPost ? 'My Post' : `Post by ${username}`} />
      )}
      {!tag && !username && <Heading children="Post List" />}
      <ul>
        {posts.map(post => {
          const { _id, title, body, publisher, createdAt } = post;

          const links = {
            title: `/posts/${_id}`,
            username: `/posts?username=${publisher.username}`,
          };

          return (
            <ListItem
              key={_id}
              title={title}
              body={body}
              username={publisher.username}
              createdAt={createdAt}
              links={links}
            />
          );
        })}
      </ul>
    </PostListWrapper>
  );
};

export default withRouter(PostList);
