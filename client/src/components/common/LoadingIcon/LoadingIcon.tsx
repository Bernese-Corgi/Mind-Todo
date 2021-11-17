import React from 'react';
import styled from 'styled-components';
import { Responsive } from '..';
import { ReactComponent as Loading } from './spinner.svg';

const StyledLoadingWrapper = styled.div`
  min-width: 5em;
  margin: 30vw auto auto auto;
  width: 15%;
  height: 15%;
`;

const StyledLoadingIcon = styled(Loading)`
  width: 100%;
  height: 100%;
`;

const LoadingIcon = () => {
  return (
    <Responsive>
      <StyledLoadingWrapper>
        <StyledLoadingIcon />
      </StyledLoadingWrapper>
    </Responsive>
  );
};

export default LoadingIcon;
