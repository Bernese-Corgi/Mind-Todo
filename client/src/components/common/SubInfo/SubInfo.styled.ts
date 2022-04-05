import styled from 'styled-components';
import theme from 'styles/theme';

export const SubInfoWrapper = styled.div`
  .writer {
    display: inline-block;
    color: ${theme.colors.primary.dark};
    padding-right: 1em;
  }

  .writtenDate {
    display: inline-block;
    font-size: 70%;
    color: ${theme.colors.gray.base};
  }
`;
