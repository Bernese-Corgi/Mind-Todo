import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

const { fonts } = theme;

export const StyledMindmapItemLink = styled(Link)`
  /* position: relative; */
  background-color: #fff;
  border-radius: 2%;
  box-shadow: ${theme.boxShadow.default};
  ${theme.transition()};

  display: block;
  width: 100%;
  height: 100%;
  padding-bottom: 1em;
  text-align: left;

  .dim {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 2%;
    ${theme.transition()}
  }

  &:hover {
    transform: translateY(-0.5em);

    .dim {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .title {
    font-size: 1.2em;
    padding: 0.5em;
    margin-top: 0.3em;
    margin-left: 0.2em;
    font-weight: ${theme.fonts.weight.bold};
    padding: 0.3em;
  }

  .preview {
    border-top-left-radius: 2%;
    border-top-right-radius: 2%;
  }
`;

export const StyledMindmapListLi = styled.li`
  ${({ theme }) => theme.media.desktop`
    width: 30%;
   `}

  ${({ theme }) => theme.media.tablet`
    width: 40%;
  `}

  ${({ theme }) => theme.media.mobile`
    width: 80%;
  `}
  margin: 1em;

  /* .dim {
    position: absolute;
    width: 100%;
    height: 100%;
    ${theme.transition()}
  } */

  /* &:hover {
    transform: translateY(-0.5em);

    .dim {
      background-color: rgba(0, 0, 0, 0.05);
    }
  } */

  /* .link {
    display: block;
    width: 100%;
    height: 100%;
    padding-bottom: 1em;
    text-align: left;
  } */

  ${theme.flexes.mixin('column', 'start', 'start')}
`;

export const StyledMindmapListUl = styled.ul`
  ${theme.flexes.mixin('row', 'start', 'start', 'wrap')}
`;

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
