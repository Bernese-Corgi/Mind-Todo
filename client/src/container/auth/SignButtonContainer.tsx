import React from 'react';
import { SignButton } from 'components/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';

const SignButtonContainer = () => {
  const { user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  }));

  return <>{!user && <SignButton />}</>;
};

export default SignButtonContainer;
