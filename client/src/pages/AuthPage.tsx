import React from 'react';
import { Dialog, MenuTab } from 'components/common';
import { SignInForm, SignUpForm } from 'container/auth';
import { Route, Switch, withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';

const AuthDialogBody = styled.div`
  ${theme.flexes.column('start')}
  padding: 4em 3em;
`;

const AuthPage = ({ history, match }) => {
  const authMenus = [
    { name: 'Sign Up', path: '/auth/sign-up' },
    { name: 'Sign In', path: '/auth/sign-in' },
  ];

  const handleCloseDialog = () => {
    history.push('/');
  };

  return (
    <Dialog visible onClose={handleCloseDialog}>
      <AuthDialogBody>
        <MenuTab menus={authMenus} linkMode />
        <Switch>
          <Route component={SignUpForm} path="/auth/sign-up" />
          <Route component={SignInForm} path="/auth/sign-in" />
        </Switch>
      </AuthDialogBody>
    </Dialog>
  );
};

AuthDialogBody.displayName = 'AuthDialogBody';

export default withRouter(AuthPage);
