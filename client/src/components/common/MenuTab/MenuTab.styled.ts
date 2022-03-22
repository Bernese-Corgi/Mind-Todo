import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

export const MenuTabWrapper = styled.div`
  ${theme.flexes.center}
  font-size: ${theme.fonts.size.base};
  font-weight: ${theme.fonts.weight.bold};
  color: ${theme.colors.gray.base};

  ul {
    ${theme.flexes.center}

    .active {
      color: ${theme.colors.primary.highSat};
      background-color: ${theme.colors.primary.xlight};
      border-radius: ${theme.borders.radius.square};

      &:hover {
        color: ${theme.colors.primary.highSat};
      }
    }
  }
`;

export const StyledLinkMenuLi = styled.li`
  min-width: max-content;
  ${theme.transition()}
`;

const activeNaveLinkStyle = {
  color: `${theme.colors.primary.highSat}`,
};

export const StyledMenuTabNavLink = styled(NavLink).attrs(() => ({
  activeStyle: activeNaveLinkStyle,
}))`
  padding: 0.5em 1.5em;
  display: block;
  width: 100%;
  height: 100%;

  &:hover {
    color: ${theme.colors.primary.lowSat};
  }
`;

export const StyledClickMenuLi = styled.li`
  padding: 0.5em 1.5em;
  cursor: pointer;
  ${theme.transition()}

  &:hover {
    color: ${theme.colors.primary.base};
  }
`;
