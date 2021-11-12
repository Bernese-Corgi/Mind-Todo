import { Headerbar } from 'components/common';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { signOutAsync } from 'redux/modules/auth/user';

const HeaderbarContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSignOut = () => {
    dispatch(signOutAsync());
  };

  return (
    <>
      <Headerbar user={user} onSignOut={handleSignOut} />
    </>
  );
};

export default HeaderbarContainer;
