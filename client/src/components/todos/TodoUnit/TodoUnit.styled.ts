import styled, { css } from 'styled-components';
import theme from 'styles/theme';

interface TodoUnitWrapperProps {
  hasColumn?: boolean;
}

export const TodoUnitWrapper = styled.section<TodoUnitWrapperProps>`
  form {
    min-width: 320px;

    .openBtn {
      margin-left: auto;
      margin-right: auto;
    }

    .addTodoTextArea {
      margin: 1em 0 1em 0;
    }
    ${({ theme }) => theme.media.desktop`
      width: 50%;
    `}
    ${({ theme }) => theme.media.tablet`
      width: 70%;
    `}
    ${({ theme }) => theme.media.mobile`
      width: 100%;
    `}
  }

  .todoListUl {
    .uncompletedList,
    .completedList {
      margin: 1em;
    }

    ${({ hasColumn }) =>
      hasColumn &&
      css`
        ${({ theme }) => theme.media.desktop`
          .uncompletedList,
          .completedList {
            width: 100%;
            margin: 1em;
          }
          ${theme.flexes.mixin('row', 'start', 'start')}
          `}
      `}
  }

  ${theme.flexes.mixin('column', 'start', 'start')}
`;
