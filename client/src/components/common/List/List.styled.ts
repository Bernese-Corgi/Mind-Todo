import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledListItem = styled.li`
  font-size: ${theme.fonts.size.base};
  width: 100%;
  border-radius: ${theme.borders.radius.square};
  padding: 1em 1em 0 1em;

  .title {
    font-weight: ${theme.fonts.weight.bold};
    padding: 0.3em;
    ${theme.transition()}

    a:hover {
      color: ${theme.colors.secondary.base};
      text-decoration: underline;
    }
  }

  .body {
    padding: 0.5em;
    width: 95%;
    text-align: left;
    margin-left: 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &::after {
    ${theme.defElem.divider()}
    margin-top: 1em;
  }

  a:hover {
    ${theme.transition('300ms', 'ease-in')}
    background-color: ${theme.colors.primary.light}50;
  }

  ${theme.flexes.mixin('column', 'start', 'center')}
`;

export const StyledSubInfo = styled.div`
  font-size: 90%;
  color: ${theme.colors.gray.dark};

  .username {
    font-weight: 600;
    margin-left: 1em;
    padding: 0.5em;

    &:hover {
      color: ${theme.colors.secondary.base};
      text-decoration: underline;
    }
  }

  .date {
    margin-left: 1em;
    font-size: 90%;
  }

  ${theme.flexes.row('start')}
`;

export const StyledList = styled.ul`
  padding: 1em;
`;
