import { Button, Input, StyledForm } from 'components/common';
import React from 'react';

type AuthFormProps = {
  authType: 'sign-in' | 'sign-up';
  // form
  onChange?: () => void;
  onSubmit?: () => void;
  onClickSubmitButton?: () => void;
};

const AuthForm = ({
  authType,
  // form,
  onChange,
  onSubmit,
  onClickSubmitButton,
}: AuthFormProps) => {
  // TODO form - props에서 받아오기
  const form = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      {/* username input ----------------------------- */}
      <Input
        id="username"
        label="username"
        name="username"
        value={form.username}
        // TODO placeholder 변경
        placeholder="username을 입력해주세요"
        onChange={onChange}
      />

      {/* email input --------------------------------- */}
      {authType === 'sign-up' && (
        <Input
          id="email"
          label="email"
          name="email"
          value={form.email}
          // TODO placeholder 변경
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
        />
      )}

      {/* password input ----------------------------- */}
      <Input
        id="password"
        label="password"
        name="password"
        value={form.password}
        // TODO placeholder 변경
        placeholder="비밀번호를 입력해주세요"
        autoComplete={
          authType === 'sign-in' ? 'current-password' : 'new-password'
        }
        onChange={onChange}
      />

      {/* password confirm input --------------------- */}
      {authType === 'sign-up' && (
        <Input
          id="passwordConfirm"
          label="passwordConfirm"
          name="passwordConfirm"
          value={form.passwordConfirm}
          // TODO placeholder 변경
          placeholder="비밀번호를 한 번 더 입력해주세요"
          onChange={onChange}
        />
      )}

      {/* submit button ----------------------------- */}
      <Button
        type="submit"
        value="로그인"
        // TODO 변경 : 로그인, 회원가입 달라지도록
        children={authType === 'sign-in' ? '로그인' : '등록'}
        fullWidth
        primary
        onClick={onClickSubmitButton}
      />
    </StyledForm>
  );
};

export default AuthForm;
