import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledPostEditorForm = styled.form`
  width: 100%;
  height: 100%;
  font-size: ${theme.fonts.size.base};

  .inputLabelWrapper,
  .mdEditorWrapper {
    margin-top: 1.5em;

    label {
      font-size: 0.9em;
      margin-left: 0.3em;
      margin-bottom: 0.5em;
    }

    ${theme.flexes.mixin('column', 'start', 'start')}
  }

  #postTitleInput,
  #postBodyInput {
    ${theme.defElem.input()}
  }

  #postBodyInput {
  }

  .btnWrapper {
    font-size: 0.9em;
    width: max-content;
    margin: 1.5em auto 1.5em auto;

    button {
      margin-left: 1em;
      margin-right: 1em;

      &:hover {
        box-shadow: ${theme.boxShadow.narrow};
      }
    }
  }
`;
