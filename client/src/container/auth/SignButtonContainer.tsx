import React from 'react';
import { SignButton } from 'components/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';

interface SignButtonContainerProps {}

const SignButtonContainer = ({}: SignButtonContainerProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  }));

  console.log(user);

  return <>{!user && <SignButton />}</>;
};

export default SignButtonContainer;
