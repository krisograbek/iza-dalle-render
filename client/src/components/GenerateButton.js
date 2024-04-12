import React from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const GenerateButtonStyled = styled.button`
  background-color: ${theme.primaryColor};
  color: white;
  padding: 10px 30px;
  margin: 20px auto; // Centers the button horizontally
  display: block; // This makes the button a block-level element, which can help with centering
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer; // It's good practice to indicate that the button is clickable

  &:hover {
    background-color: ${theme.accentColor};
  }

  &:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;


const GenerateButton = ({ onGenerate }) => {
  return (
    <GenerateButtonStyled onClick={onGenerate}>
      Generate Images
    </GenerateButtonStyled>
  );
};

export default GenerateButton;
