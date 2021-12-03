import React, { forwardRef } from 'react';
import styled from 'styled-components';

const DimWrapper = styled.div`
  .activeDim {
    transform: translate3d(0, 0, 0);
  }
`;

const StyledDim = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(-100vw, 0, 0);
  z-index: 3;
`;

interface DimProps {
  onDimClose?: () => void;
}

const Dim = forwardRef<HTMLDivElement, DimProps>(({ onDimClose }, ref) => {
  return (
    <DimWrapper>
      <StyledDim ref={ref} onClick={onDimClose} />
    </DimWrapper>
  );
});

export default Dim;
