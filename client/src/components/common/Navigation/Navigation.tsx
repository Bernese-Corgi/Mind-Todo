import { forwardRef } from 'react';
import theme from 'styles/theme';
import { Button } from '..';
import {
  NavigationWrapper,
  StyledNav,
  StyledNavUl,
  StyledNavLink,
} from './Navigation.styled';

interface NavigationProps {
  onCloseNav?: () => void;
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ onCloseNav }, ref) => {
    const localUser = localStorage.getItem('user');
    const user = localUser ? JSON.parse(localUser) : null;

    return (
      <NavigationWrapper>
        <StyledNav ref={ref}>
          <Button
            id="navCloseBtn"
            title="네비게이션 닫기"
            shape="fold"
            onClick={onCloseNav}
            color={theme.colors.gray.base}
            className="navCloseBtn"
          />
          <StyledNavUl role="menubar">
            <li role="none">
              <StyledNavLink to="/mindmaps" onClick={onCloseNav}>
                마인드맵 목록
              </StyledNavLink>
            </li>
            <li role="none">
              <StyledNavLink to="/posts" onClick={onCloseNav}>
                전체 글 목록
              </StyledNavLink>
            </li>
            <li role="none">
              <StyledNavLink
                to={`/posts?username=${user?.username}`}
                onClick={onCloseNav}>
                내가 쓴 글 목록
              </StyledNavLink>
            </li>
            <li role="none">
              <StyledNavLink to="/todos" onClick={onCloseNav}>
                Todo List
              </StyledNavLink>
            </li>
          </StyledNavUl>
        </StyledNav>
      </NavigationWrapper>
    );
  }
);

export default Navigation;
