import styled from 'styled-components';
import theme from 'styles/theme';

export const MdToolButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const StyledMdToolButton = styled.button`
  margin: 0.2em;
  padding: 0.2em;
  background-color: ${theme.colors.gray.light}90;
  width: 1.4em;
  height: 1.4em;
  border-radius: ${theme.borders.radius.square};
  ${theme.transition()}

  &:hover {
    background-color: ${theme.colors.gray.light};

    use {
      color: ${theme.colors.gray.dark};
    }
  }

  svg {
    width: 1em;
    height: 1em;
  }

  use {
    ${theme.transition()}
    color: ${theme.colors.gray.base};
    width: 100%;
    height: 100%;
  }
`;
