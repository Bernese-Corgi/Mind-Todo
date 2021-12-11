import styled from 'styled-components';
import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';

export const HeaderbarWrapper = styled.div`
  ${theme.flexes.row('space-between')}
  margin: 0;
  padding: 0;
  min-width: 320px;
  padding: 1.5em;
  font-size: ${theme.fonts.size.sm};
  background-color: #fff;

  ${({ theme }) => theme.media.mobile`
      padding: .8em;
    `}
`;

export const MenuButtonWrapper = styled.div`
  width: 33%;

  button {
    ${handleSvgHoverColor()}
  }

  ${theme.flexes.row('start')}
`;

export const LogoWrapper = styled.div`
  width: 33%;
`;

export const AuthButtonWrapper = styled.div`
  width: 33%;
  ${theme.flexes.row('end')}

  button {
    margin: 0;
    margin-left: 1em;
    font-size: 0.8em;
    min-width: max-content;
  }

  ${({ theme }) => theme.media.mobile`
    button {
      font-size: 1rem;
      padding: .4em .6em;
    }
  `}
`;

HeaderbarWrapper.displayName = 'HeaderbarWrapper';
MenuButtonWrapper.displayName = 'MenuButtonWrapper';
LogoWrapper.displayName = 'LogoWrapper';
AuthButtonWrapper.displayName = 'AuthButtonWrapper';
