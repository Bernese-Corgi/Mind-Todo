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
    ${theme.defElem.input(true)}
    margin-top: 0.5em;
    margin-bottom: 0.4em;
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
