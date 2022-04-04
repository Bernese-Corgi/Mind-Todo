import { Responsive } from 'components/common';
import { MindmapContainer } from 'container/mindmaps';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';

const MindmapWrapper = styled.section`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;

  height: 90vh;
`;

const MindmapPage = ({ history, match }) => {
  return (
    <main>
      <Responsive>
        <MindmapWrapper>
          <MindmapContainer />
        </MindmapWrapper>
      </Responsive>
    </main>
  );
};

export default withRouter(MindmapPage);
