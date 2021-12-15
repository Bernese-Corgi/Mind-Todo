import client from './client';

const URI = '/api/mindmaps';

export type MindmapType = {
  title: string;
};

export type NodeType = {
  name: string;
  parentId?: string;
};

/* --------------------------------- mindmap -------------------------------- */
export const listMindmap = () => client.get(`${URI}`);

export const writeMindmap = (mindmap: MindmapType) =>
  client.post(`${URI}`, mindmap);

export const readMindmap = (mindmapId: string) =>
  client.get(`${URI}/${mindmapId}`);

export const updateMindmap = (mindmapId: string, { title }: MindmapType) =>
  client.patch(`${URI}/${mindmapId}`, { title });

export const removeMindmap = (mindmapId: string) =>
  client.delete(`${URI}/${mindmapId}`);

/* ---------------------------------- node ---------------------------------- */
export const writeNode = (mindmapId: string, newNode: NodeType) =>
  client.post(`${URI}/${mindmapId}`, newNode);

export const readNode = (mindmapId: string, nodeId: string) =>
  client.get(`${URI}/${mindmapId}/${nodeId}`);

export const updateNode = (
  mindmapId: string,
  nodeId: string,
  updateNode: string
) => client.patch(`${URI}/${mindmapId}/${nodeId}`, updateNode);

export const removeNode = (mindmapId: string, nodeId: string) =>
  client.delete(`${URI}/${mindmapId}/${nodeId}`);
