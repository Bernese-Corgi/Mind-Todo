import client from './client';

const URI = '/api/mindmaps';

export type Mindmap = {
  title: string;
};

export type NodeType = {
  name: string;
  parentId?: string;
};

export const listMindmap = () => client.get(`${URI}`);

export const writeMindmap = (mindmap: Mindmap) =>
  client.post(`${URI}`, mindmap);

export const readMindmap = (id: string) => client.get(`${URI}/${id}`);

export const writeNode = (mindmapId: string, newNode: NodeType) =>
  client.post(`${URI}/${mindmapId}`, newNode);

export const readNode = (mindmapId: string, nodeId: string) =>
  client.get(`${URI}/${mindmapId}/${nodeId}`);
