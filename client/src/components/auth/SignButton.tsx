import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Button } from 'components/common';

const StyledSignButtonSection = styled.section`
  width: 100%;
  margin: 0 auto 0 auto;

  ${({ theme }) => theme.media.desktop`
    width: 30vw;
  `}

  ${({ theme }) => theme.media.tablet`
    width: 30vw;
  `}

  ${({ theme }) => theme.media.mobile`
    width: 50%;
  `}
`;

const StyledSignButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${theme.colors.primary.base};
  color: ${theme.colors.primary.highSat};

  &:hover {
    background-color: ${theme.colors.primary.base};
    border: 1px solid transparent;
    color: #fff;
  }
`;

const SignButton = () => {
  return (
    <StyledSignButtonSection>
      <StyledSignButton
        linkTo="/auth/sign-up"
        id="goToSignUp"
        title="회원가입"
        children="회원가입"
        fullWidth
        round="round"
      />
      <StyledSignButton
        linkTo="/auth/sign-in"
        id="goToSignIn"
        title="로그인"
        children="로그인"
        fullWidth
        round="round"
      />
    </StyledSignButtonSection>
  );
};

export default SignButton;
