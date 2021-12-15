import React from 'react';
import { MindmapContainer } from 'container/mindmaps';
import { NodeDetailContainer } from 'container/nodes';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledNodeDetailArticle = styled.article`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;
  width: 90vw;
  height: 85vh;
  margin: 0 auto 0 auto;

  .mindmapTitle {
    font-size: 1.1em;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
  }

  ${({ theme }) => theme.media.desktop`
    .mindmapDetailWrapper {
      width: 50%;
      height: 100%;
      overflow: auto;
    }
    .nodeDetailSection {
      width: 50%;
      height: 100%;
      overflow: auto;
     
    }
    
    ${theme.flexes.row('start')}
    `}

  ${({ theme }) => theme.media.tablet`
  .mindmapDetailWrapper {
    width: 50%;
    height: 100%;
    overflow: auto;
  }
  
  .nodeDetailSection {
    width: 50%;
    height: 100%;
    overflow: auto;

  }
  
  ${theme.flexes.row('start')}
  `}

${({ theme }) => theme.media.mobile`
    .mindmapDetailWrapper {
      width: 100%;
      height: 50vh;
      overflow: auto;
    }
    .nodeDetailSection {
      width: 100%;
    }
    

  `}
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
