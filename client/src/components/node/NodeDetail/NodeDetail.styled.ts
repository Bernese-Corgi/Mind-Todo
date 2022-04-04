import { Button } from 'components/common';
import { IconButtonProps } from 'components/common/Button/Button';
import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledNodeDetailSection = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 1em;

  h3 {
    font-size: 1.1em;
    margin-bottom: 0.5em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
  }

  ${({ theme }) => theme.media.desktop`
    border-left: 1px solid #DCDCDC;
  `}

  ${({ theme }) => theme.media.tablet`
    border-left: 1px solid #DCDCDC;
  `}

  ${({ theme }) => theme.media.mobile`
    border-top: 1px solid #DCDCDC;
    padding-top: 1em;
  `}
`;

export const StyledNodeRoute = styled.div`
  .title {
    font-size: 0.8em;
    font-weight: ${theme.fonts.weight.normal};
    padding-left: 0.8em;
  }
`;

export const StyledNodeName = styled.div`
  .nodeNameWrapper {
    width: 70%;
    padding: 0;
    margin-bottom: 1em;
    padding: 0.3em;

    textarea:read-only {
      font-weight: ${theme.fonts.weight.bold};
    }
  }

  &:after {
    ${theme.defElem.divider()}
    margin-bottom: 1em;
  }
`;

export const StyledNodeTodoSection = styled.section`
  margin-bottom: 2em;
  padding-left: 1em;
  padding-bottom: 1em;
  overflow: auto;

  border-bottom: 1px solid ${theme.colors.gray.light};
  position: relative;

  .openBtn {
    right: 1em;
    position: absolute;
  }

  ${({ theme }) => theme.media.desktop`
     max-height: 40%;
  `}

  ${({ theme }) => theme.media.tablet`
     max-height: 40%;
  `}

  ${({ theme }) => theme.media.mobile`
    max-height: 200px;
  `}

  ${theme.flexes.mixin('column', 'start', 'start')}
`;

export const StyledNodePostSection = styled.section`
  margin-bottom: 2em;
  padding-left: 1em;
  padding-bottom: 1em;
  overflow: auto;
  max-height: 70%;

  ${theme.flexes.mixin('column', 'start', 'start')}
`;

export const StyledNodeDetailClose = styled(Button).attrs<IconButtonProps>(
  () => ({ shape: 'cancel' })
)<IconButtonProps>`
  position: absolute;
  top: 0;
  right: 0;

  use {
    color: ${theme.colors.gray.base};
  }

  &:hover {
    use {
      color: ${theme.colors.red};
    }
  }
`;

StyledNodeDetailSection.displayName = 'StyledNodeDetailSection';
StyledNodeName.displayName = 'StyledNodeName';
StyledNodeTodoSection.displayName = 'StyledNodeTodoSection';
StyledNodePostSection.displayName = 'StyledNodePostSection';
StyledNodeDetailClose.displayName = 'StyledNodeDetailClose';
