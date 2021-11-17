import { Button, ErrorMsg, Input, StyledForm } from 'components/common';
import { FormWrapper } from 'components/common/Form.styled';
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
    <FormWrapper>
      <StyledForm onSubmit={onSubmit && (e => onSubmit(e))}>
        {/* username input ----------------------------- */}
        <Input
          id="username"
          label="username"
          name="username"
          value={form?.username}
          // TODO placeholder 변경
          placeholder="username을 입력해주세요"
          autoComplete="off"
          onChange={onChange}
        />
        <ErrorMsg>{errors.username}</ErrorMsg>

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
            <ErrorMsg>{errors.email}</ErrorMsg>
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
        <ErrorMsg>{errors.password}</ErrorMsg>

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
            <ErrorMsg>{errors.passwordConfirm}</ErrorMsg>
          </>
        )}

        <ErrorMsg className="authErrorMsg">{errors.auth}</ErrorMsg>

        {/* submit button ----------------------------- */}
        <Button
          type="submit"
          // value="로그인"
          children={authType === 'sign-in' ? '로그인' : '회원가입'}
          fullWidth
          primary
        />
      </StyledForm>
    </FormWrapper>
  );
};

export default AuthForm;
