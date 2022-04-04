import React from 'react';
import { Responsive } from 'components/common';
import { SignButtonContainer } from 'container/auth';
import { MindmapCarouselContainer } from 'container/mindmaps';

const HomePage = () => {
  return (
    <main>
      <Responsive>
        <SignButtonContainer />
        <MindmapCarouselContainer />
      </Responsive>
    </main>
  );
};

export default HomePage;
