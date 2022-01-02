import client from './client';
import qs from 'qs';

const URI = '/api/posts';

export type PostType = {
  title: string;
  body: string;
  tags?: string[];
};

export type PostQueryType = {
  username?: string;
  tag?: string;
};

export const listPost = ({ username, tag }) => {
  const queryString = qs.stringify({ username, tag });
  return client.get(`${URI}?${queryString}`);
};

export const writePost = (nodeId: string, newPost: PostType) =>
  client.post(`${URI}/${nodeId}`, newPost);

export const readPost = (postId: string) => client.get(`${URI}/${postId}`);

export const updatePost = (postId: string, updatePost: PostType) =>
  client.patch(`${URI}/${postId}`, updatePost);

export const removePost = (postId: string) => client.delete(`${URI}/${postId}`);
