import React from 'react';
import { Heading } from 'components/common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

interface NodeRouteProps {
  level?: number;
  link?: string;
  content: string;
  className?: string;
}

const StyledNodeRouteLink = styled(Link)`
  .route {
    font-size: 0.85em;
    color: ${theme.colors.gray.base};
  }
`;

const NodeRouteContent = ({ content }) => {
  const lastIndex = content.lastIndexOf('>');
  const route = content.substring(0, lastIndex + 2);
  const nodeName = content.substring(lastIndex + 2, content.length);

  return (
    <>
      {lastIndex === -1 ? (
        <p>{content}</p>
      ) : (
        <>
          <span className="route">{route}</span>
          <span className="name">{nodeName}</span>
        </>
      )}
    </>
  );
};

const NodeRoute = ({ level = 3, link, content, className }: NodeRouteProps) => {
  return (
    <Heading level={level} className={className}>
      <>
        {link ? (
          <StyledNodeRouteLink to={link}>
            <NodeRouteContent content={content} />
          </StyledNodeRouteLink>
        ) : (
          <NodeRouteContent content={content} />
        )}
      </>
    </Heading>
  );
};

export default NodeRoute;
