import client from './client';

const URI = '/api/posts';

export type Post = {
  title: string;
  body: string;
  tags?: string[];
};

export const writePost = (nodeId: string, newPost: Post) =>
  client.post(`${URI}/${nodeId}`, newPost);

export const readPost = (postId: string) => client.get(`${URI}/${postId}`);
