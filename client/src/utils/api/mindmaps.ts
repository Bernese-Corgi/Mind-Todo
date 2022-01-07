import {
  HierarchyNode,
  HierarchyPointLink,
  HierarchyPointNode,
} from '@visx/hierarchy/lib/types';
import { UserType } from './auth';
import client from './client';
import { PostType } from './posts';
import { TodoType } from './todos';

const URI = '/api/mindmaps';

export type MindmapType = {
  _id?: string;
  title: string;
  publisher?: string | UserType;
  body?: TreeType[];
  createdAt?: string;
};

export type TreeType = {
  _id?: string;
  node: NodeType;
  parent: NodeType;
};

export type CustomHierarchyNode = HierarchyNode<TreeType>;

export type CustomHierarchyPointNode = HierarchyPointNode<TreeType>;
export type CustomHierarchyPointLink = HierarchyPointLink<TreeType>;

export type NodeType = NodeReqType & {
  _id?: string;
  mindmapId?: string;
  post?: PostType;
  todos?: TodoType;
};

export type NodeReqType = {
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
