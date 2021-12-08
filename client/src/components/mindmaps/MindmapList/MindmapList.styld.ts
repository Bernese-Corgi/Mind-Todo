import styled from 'styled-components';
import theme from 'styles/theme';

const { fonts } = theme;

export const MindmapListWrapper = styled.section`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;

  .sectionH2 {
    font-size: 1.1em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
    margin: 1em 2em 2em 2em;
  }

  .addMindmapBtn {
    margin-left: 80%;
    font-size: 80%;
    width: max-content;
  }

  .mindmapList {
    margin: 1em;
  }

  ${({ theme }) => theme.media.desktop`
    font-size: ${theme.fonts.size.base};
  `}

  ${({ theme }) => theme.media.tablet`
    font-size: ${theme.fonts.size.sm};
  `}

  ${({ theme }) => theme.media.mobile`
    font-size: ${fonts.size.xs};
  `}
`;
