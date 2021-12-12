import styled from 'styled-components';
import theme from 'styles/theme';

export const TodoItemWrapper = styled.div`
  /* TODO fontSize 더 상위로 옮기기 */
  font-size: ${theme.fonts.size.sm};
  width: 100%;
  height: auto;
  padding: 0.2em;
  border-radius: ${theme.borders.radius.square};

  &:hover {
    background-color: ${theme.colors.gray.light}40;
  }

  ${theme.flexes.row('start')}
`;
