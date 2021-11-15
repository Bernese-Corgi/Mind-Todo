import React from 'react';
import { Link } from 'react-router-dom';

interface MindmapListProps {
  mindmaps: any;
  loading;
  error;
}

const MindmapList = ({ mindmaps, loading, error }: MindmapListProps) => {
  return (
    <>
      <h2>Mindmap List</h2>
      <ul>
        {mindmaps?.map((mindmap, index) => {
          return (
            <li key={index}>
              <Link to={`/mindmap/${mindmap._id}`}>{mindmap.title}</Link>
              <time>{mindmap.createdAt}</time>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MindmapList;
