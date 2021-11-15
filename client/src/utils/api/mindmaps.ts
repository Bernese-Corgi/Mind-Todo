import client from './client';

const URI = '/api/mindmaps';

export type Mindmap = {
  title: string;
};

export const listMindmap = () => client.get(`${URI}`);

export const writeMindmap = (mindmap: Mindmap) =>
  client.post(`${URI}`, mindmap);

export const readMindmap = (id: string) => client.get(`${URI}/${id}`);
