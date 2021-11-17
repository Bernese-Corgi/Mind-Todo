import { stratify } from 'd3-hierarchy';

export const stratifiedMindmap = treeData => {
  const stratifiedData = stratify()
    .id((d: any) => d.node.name)
    .parentId((d: any) => d.parent.name)(treeData);

  return stratifiedData;
};
