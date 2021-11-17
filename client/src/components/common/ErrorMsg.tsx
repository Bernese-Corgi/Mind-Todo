import React, { ReactChild } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface ErrorMsgProps {
  className?: string;
  children?: ReactChild;
}

const StyledErrorMsg = styled.p<ErrorMsgProps>`
  display: inline-block;
  color: ${theme.colors.red};
  font-size: 0.8em;
  padding-left: 0.5em;
`;

const ErrorMsg = ({ className, children }: ErrorMsgProps) => {
  return (
    <>
      {!!children && (
        <StyledErrorMsg className={className}>{children}</StyledErrorMsg>
      )}
    </>
  );
};

export default ErrorMsg;
