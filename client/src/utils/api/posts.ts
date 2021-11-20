import client from './client';

const URI = '/api/posts';

export const writePost = (nodeId: string) => client.post(`${URI}/${nodeId}`);


