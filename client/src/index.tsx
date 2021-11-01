import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from 'styles/global-style';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

reportWebVitals();
