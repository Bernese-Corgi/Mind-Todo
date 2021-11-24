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
          errorMsg={errors.username}
          // TODO placeholder 변경
          placeholder="username을 입력해주세요"
          autoComplete="off"
          onChange={onChange}
        />

        {/* email input --------------------------------- */}
        {authType === 'sign-up' && (
          <>
            <Input
              id="email"
              label="email"
              name="email"
              value={authType === 'sign-up' && form?.email}
              errorMsg={errors.email}
              // TODO placeholder 변경
              placeholder="이메일을 입력해주세요"
              onChange={onChange}
            />
          </>
        )}

        {/* password input ----------------------------- */}
        <Input
          type="password"
          id="password"
          label="password"
          name="password"
          value={form?.password}
          errorMsg={errors.password}
          // TODO placeholder 변경
          placeholder="비밀번호를 입력해주세요"
          autoComplete={
            authType === 'sign-in' ? 'current-password' : 'new-password'
          }
          onChange={onChange}
        />

        {/* password confirm input --------------------- */}
        {authType === 'sign-up' && (
          <>
            <Input
              type="password"
              id="passwordConfirm"
              label="passwordConfirm"
              name="passwordConfirm"
              value={form?.passwordConfirm}
              errorMsg={errors.passwordConfirm}
              // TODO placeholder 변경
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={onChange}
            />
          </>
        )}

        <ErrorMsg className="formErrorMsg">{errors.auth}</ErrorMsg>

        {/* submit button ----------------------------- */}
        <Button
          id={`sumit${authType === 'sign-in' ? 'SignIn' : 'SignUp'}`}
          title={`${authType === 'sign-in' ? '로그인' : '회원가입'}하기`}
          type="submit"
          children={authType === 'sign-in' ? '로그인' : '회원가입'}
          fullWidth
          primary
        />
      </StyledForm>
    </FormWrapper>
  );
};

export default AuthForm;
