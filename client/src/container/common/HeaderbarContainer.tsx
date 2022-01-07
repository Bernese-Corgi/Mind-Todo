import React, { useRef } from 'react';
import { Headerbar } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { signOutAsync } from 'redux/modules/auth/user';
import { withRouter } from 'react-router';

const HeaderbarContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const navDimRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleNavMenu = () => {
    navDimRef.current?.classList.add('activeDim');
    navRef.current?.classList.add('activeNav');
    navDimRef.current?.setAttribute('aria-hidden', 'false');
  };

  const handleCloseNav = () => {
    navDimRef.current?.classList.remove('activeDim');
    navDimRef.current?.setAttribute('aria-hidden', 'true');
    navRef.current?.classList.remove('activeNav');
  };

  const handleSignOut = () => {
    dispatch(signOutAsync());
    history.push('/');
  };

  return (
    <Headerbar
      user={user}
      navRef={navRef}
      navDimRef={navDimRef}
      onOpenNav={handleNavMenu}
      onCloseNav={handleCloseNav}
      onSignOut={handleSignOut}
    />
  );
};

export default withRouter(HeaderbarContainer);
