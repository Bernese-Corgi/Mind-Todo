import React from 'react';

interface HeadingProps {
  level?: number;
  children: string;
  className: string;
}

const Heading = ({
  level,
  children,
  className,
  ...restProps
}: HeadingProps) => {
  return React.createElement(`h${level}`, {
    children,
    className,
    ...restProps,
  });
};

export default Heading;
