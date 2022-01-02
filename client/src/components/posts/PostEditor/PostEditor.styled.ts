import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledPostEditorForm = styled.form`
  width: 100%;
  height: 100%;
  font-size: 1em;

  label {
    font-size: 0.9em;
    margin-left: 0.3em;
    margin-bottom: 0.5em;
  }

  .inputLabelWrapper,
  .mdEditorWrapper {
    margin-bottom: 1.5em;
  }

  .inputLabelWrapper,
  .mdEditorWrapper {
    ${theme.flexes.mixin('column', 'start', 'start')}
  }

  .tagInputWrapper {
    margin-top: 2em;
    height: 18%;

    ul {
      margin-left: 1em;
      font-size: 85%;
      width: 60%;
      padding: 0.3em;
      border-radius: ${theme.borders.radius.square};
      background-color: ${theme.colors.primary.light}40;
    }

    ${theme.flexes.mixin('row', 'center', 'start')}
  }

  #postTitleInput,
  #postBodyInput,
  #postTagInput {
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
