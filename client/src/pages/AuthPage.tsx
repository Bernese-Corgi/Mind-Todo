import React from 'react';
import { Dialog, MenuTab } from 'components/common';
import { SignInForm, SignUpForm } from 'container/auth';
import { Route, Switch, withRouter } from 'react-router';

const AuthPage = ({ history }) => {
  const authMenus = [
    { name: 'Sign Up', path: '/auth/sign-up' },
    { name: 'Sign In', path: '/auth/sign-in' },
  ];

  const handleCloseDialog = () => {
    history.push('/');
  };

  return (
    <Dialog visible onClose={handleCloseDialog}>
      <>
        <MenuTab menus={authMenus} />
        <Switch>
          <Route component={SignUpForm} path="/auth/sign-up" />
          <Route component={SignInForm} path="/auth/sign-in" />
        </Switch>
      </>
    </Dialog>
  );
};

export default withRouter(AuthPage);
