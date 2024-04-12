// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f2f5;
    color: #333;
  }

  input, button, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  // Adding padding to the main container
  .App {
    padding: 40px;
    max-width: 1200px;
    margin: auto;
  }
`;

export const theme = {
  primaryColor: '#5c6bc0',
  accentColor: '#ffca28',
  lightGray: '#f0f2f5',
  darkGray: '#333',
  borderColor: '#e0e0e0',
  borderRadius: '4px',
};
