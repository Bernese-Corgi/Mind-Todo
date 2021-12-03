import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { EditInputProps } from './EditInput';

const { colors } = theme;

export const StyledEditInput = styled.input<EditInputProps>`
  ${theme.defElem.input()}
  &:hover {
    background-color: transparent;
  }

  ${({ readOnly, done }) => {
    console.log(readOnly, done);
    if (readOnly && !done)
      return css`
        outline: transparent;
        border: 1px solid transparent;

        &:focus {
          border: 1px solid transparent;
        }

        ::-moz-selection {
          background: ${colors.primary.base}60;
        }
        ::selection {
          background: ${colors.primary.base}60;
        }
      `;

    if (!readOnly && done)
      return css`
        border-bottom: 0.1rem solid ${colors.gray.base};
      `;

    if (readOnly && done)
      return css`
        color: ${colors.gray.base};
        text-decoration: line-through;
        border: 1px solid transparent;

        &:focus {
          outline: transparent;
          border: 1px solid transparent;

          ::-moz-selection {
            color: ${colors.gray.dark};
            text-decoration: line-through ${colors.gray.dark}60;
            background: ${colors.gray.light};
          }
          ::selection {
            color: ${colors.gray.dark};
            text-decoration: line-through ${colors.gray.dark}60;
            background: ${colors.gray.light};
          }
        }
      `;
  }}
`;

export const StyledEditTextArea = styled.textarea<EditInputProps>`
  ${theme.defElem.input()}
  &:hover {
    background-color: transparent;
  }

  ${({ readOnly, done }) => {
    console.log(readOnly, done);
    if (readOnly && !done)
      return css`
        outline: transparent;
        border: 1px solid transparent;

        &:focus {
          border: 1px solid transparent;
        }

        ::-moz-selection {
          background: ${colors.primary.base}60;
        }
        ::selection {
          background: ${colors.primary.base}60;
        }
      `;

    if (!readOnly && done)
      return css`
        border-bottom: 0.1rem solid ${colors.gray.base};
      `;

    if (readOnly && done)
      return css`
        color: ${colors.gray.base};
        text-decoration: line-through;
        border: 1px solid transparent;

        &:focus {
          outline: transparent;
          border: 1px solid transparent;

          ::-moz-selection {
            color: ${colors.gray.dark};
            text-decoration: line-through ${colors.gray.dark}60;
            background: ${colors.gray.light};
          }
          ::selection {
            color: ${colors.gray.dark};
            text-decoration: line-through ${colors.gray.dark}60;
            background: ${colors.gray.light};
          }
        }
      `;
  }}
`;
