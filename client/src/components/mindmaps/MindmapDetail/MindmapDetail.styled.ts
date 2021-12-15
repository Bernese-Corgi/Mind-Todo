import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledMindmapDetailSection = styled.section`
  min-width: 720px;
  width: 100%;
  height: 100%;
  padding: 1em;
  overflow: auto;

  .mindmapTitle {
    font-size: 1.1em;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
  }

  ${theme.flexes.mixin('column', 'start', 'start')}
`;
