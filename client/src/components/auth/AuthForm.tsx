import { Button, Input, StyledForm } from 'components/common';
import React, { ChangeEvent, FormEvent } from 'react';
import { SignIn, SignUp } from 'utils/api/auth';

type AuthFormProps = {
  authType: 'sign-in' | 'sign-up';
  // form: SignUp | SignIn | null;
  form: any;
  errors: any;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthForm = ({
  authType,
  form,
  errors,
  onSubmit,
  onChange,
}: AuthFormProps) => {
  return (
    <StyledForm onSubmit={onSubmit && (e => onSubmit(e))}>
      {/* username input ----------------------------- */}
      <Input
        id="username"
        label="username"
        name="username"
        value={form?.username}
        // TODO placeholder 변경
        placeholder="username을 입력해주세요"
        onChange={onChange}
      />
      {errors.username && (
        <span style={{ color: 'red', fontSize: '1.2rem', paddingTop: '.5em' }}>
          {errors.username}
        </span>
      )}

      {/* email input --------------------------------- */}
      {authType === 'sign-up' && (
        <>
          <Input
            id="email"
            label="email"
            name="email"
            value={authType === 'sign-up' && form?.email}
            // TODO placeholder 변경
            placeholder="이메일을 입력해주세요"
            onChange={onChange}
          />
          {errors.email && (
            <span
              style={{ color: 'red', fontSize: '1.2rem', paddingTop: '.5em' }}>
              {errors.email}
            </span>
          )}
        </>
      )}

      {/* password input ----------------------------- */}
      <Input
        type="password"
        id="password"
        label="password"
        name="password"
        value={form?.password}
        // TODO placeholder 변경
        placeholder="비밀번호를 입력해주세요"
        autoComplete={
          authType === 'sign-in' ? 'current-password' : 'new-password'
        }
        onChange={onChange}
      />
      {errors.password && (
        <span style={{ color: 'red', fontSize: '1.2rem', paddingTop: '.5em' }}>
          {errors.password}
        </span>
      )}

      {/* password confirm input --------------------- */}
      {authType === 'sign-up' && (
        <>
          <Input
            type="password"
            id="passwordConfirm"
            label="passwordConfirm"
            name="passwordConfirm"
            value={form?.passwordConfirm}
            // TODO placeholder 변경
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={onChange}
          />
          {errors.passwordConfirm && (
            <span
              style={{ color: 'red', fontSize: '1.2rem', paddingTop: '.5em' }}>
              {errors.passwordConfirm}
            </span>
          )}
        </>
      )}

      {errors.auth && (
        <span
          style={{ color: 'maroon', fontSize: '1.2rem', paddingTop: '1em' }}>
          {errors.auth}
        </span>
      )}

      {/* submit button ----------------------------- */}
      <Button
        type="submit"
        value="로그인"
        // TODO 변경 : 로그인, 회원가입 달라지도록
        children={authType === 'sign-in' ? '로그인' : '등록'}
        fullWidth
        primary
      />
    </StyledForm>
  );
};

export default AuthForm;
