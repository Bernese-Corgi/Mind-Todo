import React, { useEffect, useState } from 'react';
import { Heading, Skeleton } from 'components/common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';
import { MindmapType } from 'utils/api/mindmaps';
import { findNodeAsTreeById, getNodeRoute } from 'utils/mindmap';

interface NodeRouteProps {
  level?: number;
  mindmap: Partial<MindmapType>;
  nodeIdToFind: string;
  hasLink?: boolean;
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

const NodeRoute = ({
  level = 3,
  mindmap,
  nodeIdToFind,
  hasLink = false,
  className,
}: NodeRouteProps) => {
  const [nodeRoute, setNodeRoute] = useState<string>('');

  const link = `/mindmap/${mindmap?._id}/${nodeIdToFind}`;

  useEffect(() => {
    if (mindmap?.body && nodeIdToFind) {
      const matchNode = findNodeAsTreeById(nodeIdToFind, mindmap.body);
      if (matchNode) {
        const route = getNodeRoute(matchNode, mindmap.body, '>');

        setNodeRoute(route);
      }
    }
  }, [mindmap?.body, nodeIdToFind]);

  if (!nodeRoute) {
    return <Skeleton types={['subInfo']} />;
  }

  return (
    <Heading level={level} className={className}>
      {hasLink ? (
        <StyledNodeRouteLink to={link}>
          <NodeRouteContent content={nodeRoute} />
        </StyledNodeRouteLink>
      ) : (
        <NodeRouteContent content={nodeRoute} />
      )}
    </Heading>
  );
};

export default NodeRoute;
