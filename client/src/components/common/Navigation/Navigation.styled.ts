import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledNav = styled.nav`
  background-color: #ffffff;
  padding: 1em;
  min-width: 320px;
  width: 40%;
  height: 100vh;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(-50vw, 0, 0);
  transition: 1s;
  border-radius: 0rem 2rem 2rem 0rem;
`;

export const NavigationWrapper = styled.div`
  #navCloseBtn {
    position: absolute;
    top: 3rem;
    left: 4rem;
    width: 1.7rem;
    height: 2rem;
  }

  .activeNav {
    transform: translate3d(0, 0, 0);
    position: fixed;
  }
`;

export const StyledNavUl = styled.ul`
  margin-top: 2em;
`;

export const StyledNavLink = styled(NavLink).attrs(() => ({
  role: 'menuitem',
}))`
  display: block;
  font-size: ${theme.fonts.size.sm};
  font-weight: 500;
  padding-top: 1.5em;
  color: ${theme.colors.gray.dark};
  ${theme.transition()}

  &:hover {
    background-color: ${theme.colors.primary.light}50;
  }

  &::after {
    ${theme.defElem.divider()}
    margin-top: 1.5em;
  }
`;
