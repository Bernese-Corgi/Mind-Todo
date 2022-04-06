import React from 'react';
import { MindmapListContainer } from 'container/mindmaps';
import { Responsive } from 'components/common';

const MindmapListPage = () => {
  return (
    <main>
      <Responsive>
        <MindmapListContainer />
      </Responsive>
    </main>
  );
};

export default MindmapListPage;
