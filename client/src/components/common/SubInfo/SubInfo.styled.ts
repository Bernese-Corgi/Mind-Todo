import styled from 'styled-components';
import theme from 'styles/theme';

export const SubInfoWrapper = styled.div`
  .writer {
    display: inline-block;
    color: ${theme.colors.primary.dark};
    margin-right: 0.6em;
    padding: 0.2em 0.4em;
    ${theme.transition()}
  }

  .writerLink:hover {
    border-radius: ${theme.borders.radius.square};
    background-color: ${theme.colors.secondary.light}50;
  }

  .writtenDate {
    display: inline-block;
    font-size: 70%;
    color: ${theme.colors.gray.base};
  }
`;
