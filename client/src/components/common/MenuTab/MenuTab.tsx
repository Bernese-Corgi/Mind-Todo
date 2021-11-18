import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

interface MenuTabProps {
  menus: Array<{ name: string; path: string }>;
}

const MenuTabWrapper = styled.div`
  ${theme.flexes.center}
  font-size: ${theme.fonts.size.base};
  font-weight: ${theme.fonts.weight.bold};
  color: ${theme.colors.gray.base};

  ul {
    ${theme.flexes.center}
  }
  li {
    padding: 0.5em 1.5em;
    min-width: max-content;
  }
`;

const activeNaveLinkStyle = {
  color: `${theme.colors.primary.highSat}`,
};

const MenuTab = ({ menus }: MenuTabProps) => (
  <MenuTabWrapper>
    <ul>
      {menus.map((menu, index) => {
        return (
          <>
            {index >= 1 && <span>|</span>}
            <li key={index}>
              <NavLink
                key={index}
                to={menu.path}
                activeStyle={activeNaveLinkStyle}>
                {menu.name}
              </NavLink>
            </li>
          </>
        );
      })}
    </ul>
  </MenuTabWrapper>
);

export default MenuTab;
