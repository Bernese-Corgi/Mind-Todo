import styled from 'styled-components';
import theme from 'styles/theme';

export const FormWrapper = styled.div`
  display: block;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
`;

const StyledForm = styled.form`
  width: 100%;
  font-size: 1.5rem;
  ${theme.transition()}

  .inputLabelWrapper {
    width: 100%;
    margin-top: 1.4em;
  }

  & label {
    margin-left: 0.3em;
  }

  & input {
    display: block;
    width: 100%;
    margin-top: 0.5em;
    margin-bottom: 0.4em;
    padding: 0.5em;
    border: 1px solid ${theme.colors.gray.base}40;
    border-radius: ${theme.borders.radius.square};
    color: ${theme.colors.gray.dark};
    ${theme.transition('130ms')}

    &:hover {
      background-color: ${theme.colors.gray.light}30;
    }

    &:focus {
      border: 1px solid ${theme.colors.gray.dark}80;
    }

    &::placeholder {
      font-size: 85%;
      color: ${theme.colors.gray.dark}90;
    }
  }

  .authErrorMsg {
    font-size: 0.9em;
    display: block;
    width: 100%;
    border-radius: ${theme.borders.radius.square};
    text-align: center;
    padding: 0.3em 0 0.3em 0;
    margin: 1em auto 0 auto;
  }

  & button {
    margin-top: 1.2em;
  }
`;

FormWrapper.displayName = 'FormWrapper';
StyledForm.displayName = 'StyledForm';

export default StyledForm;
