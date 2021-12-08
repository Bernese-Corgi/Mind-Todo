import theme from 'styles/theme';

export const deleteDialogStyle = `
background: ${theme.colors.white};
border-radius: ${theme.borders.radius.square};
width: 300px;
min-height: 150px;
font-size: ${theme.fonts.size.sm};

.delDialogBody {
  padding: 1.5em;
  top: 0;
  
  p {
    margin-top: 2em;
    margin-left: 3em;
  }

  ${theme.flexes.mixin('column', 'start', 'space-between')}
}

.delDialogBtns {
  font-size: 80%;
  width: 100%;
  margin-top: 1.5em;

  button {
    margin-right: 1em;
  }
  
  ${theme.flexes.row('flex-end')}
}
`;
