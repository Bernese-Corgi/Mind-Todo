import React from 'react';
import { Mindmap } from 'utils/api/mindmaps';

interface MindmapTreeProps {
  mindmap: Mindmap;
}

const MindmapTree = ({ mindmap }: MindmapTreeProps) => {
  return (
    <>
      <h2>{mindmap?.title}</h2>
    </>
  );
};

export default MindmapTree;
