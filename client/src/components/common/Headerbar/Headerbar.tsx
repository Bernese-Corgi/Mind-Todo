import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Responsive } from '..';
import {
  AuthButtonWrapper,
  HeaderbarWrapper,
  LogoWrapper,
  MenuButtonWrapper,
} from './Headerbar.styled';

interface HeaderbarProps {
  user: any;
  onSignOut?: () => void;
}

const Headerbar = ({ user, onSignOut }: HeaderbarProps) => {
  return (
    <Responsive>
      <HeaderbarWrapper>
        {/* navigation button --------------------------- */}
        <MenuButtonWrapper>
          <Button shape="bars" />
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
              <Button textOnly>{user.username}</Button>
              <Button onClick={onSignOut}>로그아웃</Button>
            </>
          ) : (
            // 로그인 x
            <>
              <Button linkTo="/auth/sign-in" primary>
                로그인
              </Button>
              <Button linkTo="/auth/sign-up" primary>
                회원가입
              </Button>
            </>
          )}
        </AuthButtonWrapper>
      </HeaderbarWrapper>
    </Responsive>
  );
};

export default Headerbar;
