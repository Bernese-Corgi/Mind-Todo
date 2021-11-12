import { AuthForm } from 'components/auth';
import { userInfo } from 'os';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'redux/modules';
import { initializeAuth, signUpAsync } from 'redux/modules/auth/auth';
import { checkAsync } from 'redux/modules/auth/user';
import { SignUp } from 'utils/api/auth';

const SignUpForm = ({ history }) => {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state: RootState) => state);

  const [values, setValues] = useState<SignUp>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    auth: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'username') {
      value.length < 3 || value.length >= 30
        ? setErrors({
            ...errors,
            username: 'username은 3자 이상 30자 이하로 입력해주세요.',
          })
        : setErrors({ ...errors, username: '' });
    }

    if (name === 'email') {
      const emailRegex =
        /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

      !emailRegex.test(value)
        ? setErrors({
            ...errors,
            email: 'email형식에 맞게 입력해주세요',
          })
        : setErrors({ ...errors, email: '' });
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

    if (name === 'passwordConfirm') {
      values.password !== value
        ? setErrors({
            ...errors,
            passwordConfirm: '비밀번호가 일치하지 않습니다.',
          })
        : setErrors({ ...errors, passwordConfirm: '' });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpAsync(values));
  };

  // 회원가입 성공/실패 처리
  useEffect(() => {
    // auth.error 값이 유효한 경우
    if (auth.error) {
      // 계정 충돌
      if (auth.error.response?.status === 409) {
        setErrors({
          ...errors,
          auth: `이미 존재하는 계정입니다. ${auth.error.response.data}을(를) 다시 확인해주세요.`,
        });
        return;
      }
      return;
    }

    // auth 값이 유효한 경우
    if (auth.data) {
      // user 설정
      dispatch(checkAsync());
      // values 초기화
      dispatch(initializeAuth());
    }
  }, [auth, dispatch]);

  // user값이 잘 설정되었는지 확인
  useEffect(() => {
    // user값이 유효하면
    if (user.user) {
      history.push('/');

      // 로그인 상태 유지
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
        form={values}
        errors={errors}
        authType="sign-up"
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </>
  );
};

export default withRouter(SignUpForm);
