import client from './client';

const URI = '/api/mindmaps';

export type Mindmap = {
  title: string;
};

export const writeMindmap = (mindmaps: Mindmap) =>
  client.post(`${URI}`, mindmaps);

export const readMindmap = (id: string) => client.get(`${URI}/${id}`);
