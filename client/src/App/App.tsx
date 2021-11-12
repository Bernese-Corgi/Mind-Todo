import { Dialog } from 'components/common';
import SignInForm from 'container/auth/SignInForm';
import SignUpForm from 'container/auth/SignUpForm';
import { HomePage } from 'pages';
import { Route } from 'react-router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route component={HomePage} path="/" />

      <Route
        render={({ history }) => {
          return (
            <Dialog
              hasModal
              visible
              onClose={() => {
                history.goBack();
              }}>
              <SignUpForm />
            </Dialog>
          );
        }}
        path="/sign-up"
      />

      <Route
        render={({ history }) => {
          return (
            <Dialog
              hasModal
              visible
              onClose={() => {
                history.goBack();
              }}>
              <SignInForm />
            </Dialog>
          );
        }}
        path="/sign-in"
      />
    </div>
  );
}

export default App;
