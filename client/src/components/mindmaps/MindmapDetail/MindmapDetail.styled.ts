import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledMindmapDetailSection = styled.section`
  min-width: 720px;
  width: 100%;
  height: 100%;
  padding: 1em;
  overflow: auto;

  h2 {
    font-size: 1.1em;
    margin-bottom: 0.5em;
    text-align: left;
  }

  ${theme.flexes.mixin('column', 'start', 'start')}
`;
