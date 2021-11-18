import { AuthForm } from 'components/auth';
import { LoadingIcon } from 'components/common';
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (!!errors.auth) {
      if (name === 'username') {
        value.length < 3 || value.length >= 30
          ? setErrors({
              ...errors,
              username: 'username은 3자 이상 30자 이하로 입력해주세요.',
            })
          : setErrors({ ...errors, username: '' });
      }

      if (name === 'password') {
        const passwordRegex = /^[a-zA-Z0-9]{3,30}$/;

        !passwordRegex.test(value)
          ? setErrors({
              ...errors,
              password: '영어, 숫자로만 3자 이상, 30자 이하로 입력해주세요.',
            })
          : setErrors({ ...errors, password: '' });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.username || !values.password) {
      setErrors({ ...errors, auth: '빈 칸을 모두 입력해주세요.' });
    }

    dispatch(signInAsync(values));
  };

  useEffect(() => {
    if (auth.error) {
      if (auth.error.response?.status === 401) {
        setErrors({
          ...errors,
          auth: `로그인에 실패했습니다. ${auth.error.response.data}를 확인해주세요.`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, dispatch, history]);

  useEffect(() => {
    if (user.user) {
      history.push('/');

      try {
        localStorage.setItem('user', JSON.stringify(user.user));
      } catch (e) {
        console.error(e);
      }
    }
  }, [auth.data, history, user.user]);

  if (auth.loading) return <LoadingIcon />;

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
