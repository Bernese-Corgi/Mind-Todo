import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledPostEditorForm = styled.form`
  width: 100%;
  height: 100%;
  font-size: 1em;

  .inputLabelWrapper {
    margin-bottom: 1.5em;
  }

  .inputLabelWrapper,
  .mdEditorWrapper {
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

  .btnWrapper {
    width: max-content;
    margin: 0 auto 0 auto;

    button {
      margin-left: 1em;
      margin-right: 1em;

      ${({ theme }) => theme.media.desktop`
            font-size: 0.9em;
            padding-left: 2em;
            padding-right: 2em;
            `}
      ${({ theme }) => theme.media.tablet`
            font-size: 0.9em;
            padding-left: 2em;
            padding-right: 2em;
            `}
      ${({ theme }) => theme.media.mobile`
            font-size: 0.8em;
            padding: 0.5em 1em;
            border-radius: ${theme.borders.radius.square}
      `}

      &:hover {
        box-shadow: ${theme.boxShadow.narrow};
      }
    }
  }
`;
