import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledToolBoxUl = styled.ul`
  background-color: #f0ebe4;
  padding: 0.6em 0.5em 0.2em 0.5em;
  border-radius: ${theme.borders.radius.square};
  position: absolute;
  z-index: 10;
  width: max-content;
  box-shadow: ${theme.boxShadow.wide};

  clip-path: polygon(
    15% -4%,
    20% 20%,
    98% 20%,
    100% 26%,
    100% 100%,
    0 100%,
    0 26%,
    2% 20%,
    10% 20%
  );
`;

export const StyledToolBoxItemLi = styled.li`
  display: inline-block;

  button {
    padding: 0 0.2em 0 0.2em;
    font-size: 90%;
    color: ${theme.colors.gray.dark};
    border-radius: ${theme.borders.radius.square};
    ${theme.transition()}
  }

  button:hover {
    background-color: ${theme.colors.gray.base}50;
  }

  &:after {
    content: '';
    display: inline-block;
    background-color: ${theme.colors.gray.dark};
    width: 1px;
    height: 0.8em;
    margin-left: 0.4em;
    margin-right: 0.4em;
  }

  &:last-child:after {
    width: 0;
    height: 0;
    margin: 0;
  }
`;
