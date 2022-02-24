import React from 'react';
import { Responsive } from 'components/common';
import { SignButtonContainer } from 'container/auth';
import { MindmapCarouselContainer } from 'container/mindmaps';

const HomePage = () => {
  return (
    <Responsive>
      <SignButtonContainer />
      <MindmapCarouselContainer />
    </Responsive>
  );
};

export default HomePage;
