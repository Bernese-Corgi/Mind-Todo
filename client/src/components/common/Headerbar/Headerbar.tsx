import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dim, Navigation, Responsive } from '..';
import {
  AuthButtonWrapper,
  HeaderbarWrapper,
  LogoWrapper,
  MenuButtonWrapper,
} from './Headerbar.styled';

interface HeaderbarProps {
  user: any;
  navRef?: any;
  navDimRef?: any;
  onOpenNav?: () => void;
  onCloseNav?: () => void;
  onSignOut?: () => void;
}

const Headerbar = ({
  user,
  navRef,
  navDimRef,
  onOpenNav,
  onCloseNav,
  onSignOut,
}: HeaderbarProps) => {
  return (
    <Responsive>
      <HeaderbarWrapper>
        {/* navigation button --------------------------- */}
        <MenuButtonWrapper>
          {user && (
            <>
              <Button
                id="navOpen"
                title="네비게이션 열기"
                shape="bars"
                onClick={onOpenNav}
              />
              <Navigation ref={navRef} onCloseNav={onCloseNav} />
              <Dim ref={navDimRef} onDimClose={onCloseNav} />
            </>
          )}
        </MenuButtonWrapper>

        {/* logo button ------------------------------ */}
        <LogoWrapper>
          <Link to="/">Mind Todo</Link>
        </LogoWrapper>

        {/* auth button ------------------------------ */}
        <AuthButtonWrapper>
          {user ? (
            // 로그인 o
            <>
              <Button
                id="userInfoBtn"
                title="사용자 정보 보기"
                textOnly
                children={user.username}
              />
              <Button
                id="signOutBtn"
                title="로그아웃"
                onClick={onSignOut}
                children="로그아웃"
              />
            </>
          ) : (
            // 로그인 x
            <>
              <Button
                id="signInBtn"
                title="로그인"
                linkTo="/auth/sign-in"
                primary
                children="
                  로그인"
              />
              <Button
                id="signUpBtn"
                title="회원가입"
                linkTo="/auth/sign-up"
                primary
                children="회원가입"
              />
            </>
          )}
        </AuthButtonWrapper>
      </HeaderbarWrapper>
    </Responsive>
  );
};

export default Headerbar;
