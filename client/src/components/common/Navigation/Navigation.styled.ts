import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';

export const StyledNav = styled.nav`
  background-color: #ffffff;
  padding: 1em;
  min-width: 320px;
  width: 40%;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 0rem 2rem 2rem 0rem;

  ${({ theme }) => theme.media.desktop`
    transform: translate3d(-50vw, 0, 0);
    transition: 1s;
    height: 100vh;
    `}

  ${({ theme }) => theme.media.tablet`
    transform: translate3d(-50vw, 0, 0);
    transition: 1s;
    height: 100vh;
  `}

  ${({ theme }) => theme.media.mobile`
    transform: translate3d(0, -100vh, 0);
    transition: 1s;
    height: fit-content;
  `}
`;

export const NavigationWrapper = styled.div`
  .navCloseBtn {
    position: absolute;
    padding: 0.5em;
    top: 2em;

    svg {
      width: 1.7rem;
      height: 2rem;

      ${handleSvgHoverColor(theme.colors.gray.dark)}
    }

    ${({ theme }) => theme.media.mobile`
      left: 2em;
      svg {
        transform: rotate(90deg);
      }
    `}

    ${({ theme }) => theme.media.desktop`
      right: 2em;
    `}

    ${({ theme }) => theme.media.tablet`
      left: 2em;
    `}
  }

  .activeNav {
    transform: translate3d(0, 0, 0);
    position: fixed;
  }
`;

export const StyledNavUl = styled.ul`
  margin-top: 4em;
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
