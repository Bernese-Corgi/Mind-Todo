import { Responsive } from 'components/common';
import { MindmapContainer } from 'container/mindmaps';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const MindmapWrapper = styled.section`
  height: 90vh;
`;

const MindmapPage = ({ history, match }) => {
  return (
    <Responsive>
      <MindmapWrapper>
        <MindmapContainer />
      </MindmapWrapper>
    </Responsive>
  );
};

export default withRouter(MindmapPage);
