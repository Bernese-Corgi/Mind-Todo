import React from 'react';
import { Responsive } from 'components/common';
import { PostViewerContainer } from 'container/posts';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledPostSection = styled.section`
  font-size: ${theme.fonts.size.sm};
  min-height: 100vh;
  padding: 5em 3em 3em 3em;
  margin: 0 auto 0 auto;
  background-color: #fff;
  box-shadow: 0 3em 3em rgba(0, 0, 0, 0.05);

  ${({ theme }) => theme.media.desktop`
    width: 900px;
  `};
`;

const PostPage = ({ match, history }) => {
  return (
    <Responsive>
      <StyledPostSection>
        <PostViewerContainer />
      </StyledPostSection>
    </Responsive>
  );
};

export default withRouter(PostPage);
