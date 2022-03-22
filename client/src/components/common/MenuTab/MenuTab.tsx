import {
  MenuTabWrapper,
  StyledClickMenuLi,
  StyledLinkMenuLi,
  StyledMenuTabNavLink,
} from './MenuTab.styled';

type LinkMenuType = Array<{ name: string; path: string }>;
type ClickMenuType = Array<{
  name: string;
  active: boolean;
  onClick: () => void;
}>;

interface MenuTabProps {
  menus: LinkMenuType | ClickMenuType;
  linkMode?: boolean;
}

const MenuTab = ({ menus, linkMode = false }: MenuTabProps) => {
  return (
    <MenuTabWrapper className="menuTabWrapper">
      <ul>
        {linkMode
          ? (menus as LinkMenuType).map((menu, index) => {
              return (
                <>
                  {index >= 1 && <span>|</span>}
                  <StyledLinkMenuLi key={index}>
                    <StyledMenuTabNavLink key={index} to={menu.path}>
                      {menu.name}
                    </StyledMenuTabNavLink>
                  </StyledLinkMenuLi>
                </>
              );
            })
          : (menus as ClickMenuType).map((menu, index) => {
              return (
                <>
                  <StyledClickMenuLi
                    key={index}
                    onClick={menu.onClick}
                    className={menu.active ? 'active' : ''}>
                    <p>{menu.name}</p>
                  </StyledClickMenuLi>
                </>
              );
            })}
      </ul>
    </MenuTabWrapper>
  );
};

export default MenuTab;
