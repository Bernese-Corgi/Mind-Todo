import { ReactNode } from 'react';
import styled from 'styled-components';

interface ResponsiveProps {
  children?: ReactNode;
}

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  ${({ theme }) => theme.media.desktop`
      width: 768px;
    `}

  ${({ theme }) => theme.media.tablet`
      width: 100%;
    `}

  ${({ theme }) => theme.media.mobile`
      width: 100%;
    `}
`;

const Responsive = ({ children, ...rest }: ResponsiveProps) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
