import React from 'react';
import { Heading } from 'components/common';
import { Link } from 'react-router-dom';

interface NodeRouteProps {
  level?: number;
  link?: string;
  content: string;
  className?: string;
}

const NodeRoute = ({ level = 3, link, content, className }: NodeRouteProps) => {
  return (
    <Heading level={level} className={className}>
      {link ? <Link to={link} children={content} /> : content}
    </Heading>
  );
};

export default NodeRoute;
