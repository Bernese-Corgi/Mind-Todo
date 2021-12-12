import React from 'react';
import { MindmapContainer } from 'container/mindmaps';
import { NodeDetailContainer } from 'container/nodes';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledNodeDetailArticle = styled.article`
  width: 90vw;
  height: 85vh;
  margin: 0 auto 0 auto;
  padding-top: 1em;
  font-size: ${theme.fonts.size.sm};

  .mindmapDetailWrapper {
    width: 50%;
    height: 100%;
    overflow: auto;
  }

  ${theme.flexes.row('start')}
`;

const NodePage = ({ history, match }) => {
  return (
    <StyledNodeDetailArticle>
      <div className="mindmapDetailWrapper">
        <MindmapContainer />
      </div>
      <NodeDetailContainer />
    </StyledNodeDetailArticle>
  );
};

export default withRouter(NodePage);
