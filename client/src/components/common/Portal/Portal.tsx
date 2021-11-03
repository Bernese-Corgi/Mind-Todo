import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  id: string;
  children: React.ReactChild;
}

const Portal = ({ children, id }: PortalProps) => {
  const mountDomNode = React.useMemo(
    () => document.getElementById(id) as HTMLElement,
    [id]
  );

  return ReactDOM.createPortal(children, mountDomNode);
};

export default Portal;
