import styled from 'styled-components';
import theme from 'styles/theme';

const StyledForm = styled.form`
  ${theme.flexes.mixin('column', 'start', 'start')}
  display: block;
  font-size: 1.5rem;

  & label {
    margin-top: 1.4em;
    margin-left: 0.3em;
  }

  & input {
    width: 80%;
    margin-top: 0.4em;
    padding: 0.5em;
    border: 1px solid ${theme.colors.gray.base}40;
    border-radius: ${theme.borders.radius.square};
    color: ${theme.colors.gray.dark};
    ${theme.transition('130ms')}

    &:hover {
      background-color: ${theme.colors.gray.light};
    }

    &:focus {
      border: 1px solid ${theme.colors.gray.dark}80;
    }

    &::placeholder {
      font-size: 85%;
      color: ${theme.colors.gray.dark}90;
    }
  }

  & button {
    margin-top: 2em;
  }
`;

export default StyledForm;
