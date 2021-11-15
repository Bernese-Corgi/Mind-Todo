import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Loading } from './spinner.svg';

const StyledLoadingIcon = styled(Loading)`
  width: 10%;
  height: 10%;
`;

const LoadingIcon = () => {
  return <StyledLoadingIcon />;
};

export default LoadingIcon;
