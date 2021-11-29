import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledTagsUl = styled.ul`
  width: 100%;
  max-height: 100%;
  overflow-x: auto;
  ${theme.flexes.mixin('row', 'start', 'start', 'wrap')}
`;

export const StyledTagLi = styled.li`
  margin-left: 0.5em;
  margin-bottom: 0.4em;

  .textBox {
    background-color: ${theme.colors.secondary.base};
    color: ${theme.colors.white};
    font-weight: 600;
    max-width: 10em;
    min-width: max-content;
    padding: 0.3em 0.6em;
    border-radius: ${theme.borders.radius.round};
    word-break: break-all;
  }

  ${theme.flexes.row('')}
`;

export const StyledCancelButton = styled.button`
  margin: 0 0.3em 0 0.3em;
  display: block;
  background-color: ${theme.colors.gray.light}90;
  border-radius: ${theme.borders.radius.round};
  width: 1.2em;
  height: 1.2em;
  opacity: 0.7;

  svg {
    margin: 0.1em;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
    svg {
      cursor: pointer;
    }
  }
`;
//
