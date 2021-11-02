import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from 'styles/global-style';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

reportWebVitals();
