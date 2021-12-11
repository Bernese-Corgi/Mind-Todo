import React from 'react';
import { ListItem, LoadingIcon } from 'components/common';

interface PostListProps {
  posts: any;
  loading: boolean;
  error;
}

const PostList = ({ posts, loading, error }: PostListProps) => {
  if (loading) return <LoadingIcon />;

  if (!posts) return <p>데이터 없음</p>;

  if (error) return <p>오류 발생</p>;

  return (
    <>
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
    </>
  );
};

export default PostList;
