import React, { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from 'utils/api/auth';
import { Button, DeleteDialog, Dim, Navigation, Responsive } from '..';
import {
  AuthButtonWrapper,
  HeaderbarWrapper,
  LogoWrapper,
  MenuButtonWrapper,
} from './Headerbar.styled';

interface HeaderbarProps {
  user: UserType;
  navRef?: RefObject<HTMLElement>;
  navDimRef?: RefObject<HTMLDivElement>;
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
  const dialogText = '로그아웃하시겠습니까?';
  const [hasDialog, setHasDialog] = useState(false);

  const handleClicks = {
    openDialog: () => setHasDialog(true),
    closeDialog: () => setHasDialog(false),
  };

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
                onClick={handleClicks.openDialog}
                children="로그아웃"
              />
              <DeleteDialog
                visible={hasDialog}
                delDialogText={dialogText}
                onClose={handleClicks.closeDialog}
                onConfirmDelete={onSignOut}
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
