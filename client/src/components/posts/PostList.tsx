import React from 'react';
import { ListItem, LoadingIcon } from 'components/common';
import styled from 'styled-components';
import theme from 'styles/theme';

interface PostListProps {
  posts: any;
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

const PostList = ({ posts, loading, error }: PostListProps) => {
  if (loading) return <LoadingIcon />;

  if (!posts) return <p>데이터 없음</p>;

  if (error) return <p>오류 발생</p>;

  return (
    <PostListWrapper>
      <h2>Post List</h2>
      <ul>
        {posts.map(post => {
          const {
            _id,
            title,
            body,
            publisher: { username },
            createdAt,
          } = post;

          const links = {
            title: `/posts/${_id}`,
            username: `/posts?${username}`,
          };

          return (
            <ListItem
              key={_id}
              title={title}
              body={body}
              username={username}
              createdAt={createdAt}
              links={links}
            />
          );
        })}
      </ul>
    </PostListWrapper>
  );
};

export default PostList;
