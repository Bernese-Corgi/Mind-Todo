import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from 'styles/global-style';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from 'redux/store';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

reportWebVitals();
