import { AuthForm } from 'components/auth';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import { initializeAuth, signInAsync } from 'redux/modules/auth/auth';
import { checkAsync } from 'redux/modules/auth/user';
import { SignIn } from 'utils/api/auth';

const SignInForm = ({ history }) => {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state: RootState) => state);

  const [values, setValues] = useState<SignIn>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    auth: '',
  });

  // console.log(auth);

  console.log(values);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInAsync(values));
  };

  useEffect(() => {
    if (auth.error) {
      if (auth.error.response?.status === 401) {
        setErrors({
          ...errors,
          auth: `${auth.error.response.data}를 확인해주세요.`,
        });
        return;
      }
      return;
    }

    if (auth.data) {
      // user 설정
      dispatch(checkAsync());
      // values 초기화
      dispatch(initializeAuth());
    }
  }, [auth, dispatch, history]);

  useEffect(() => {
    if (user.user) {
      history.push('/');

      try {
        localStorage.setItem('user', JSON.stringify(auth.data));
      } catch (e) {
        console.error(e);
      }
    }
  }, [auth.data, history, user.user]);

  return (
    <>
      <AuthForm
        authType="sign-in"
        form={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default withRouter(SignInForm);
