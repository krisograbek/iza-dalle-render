import React from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const GenerateButtonStyled = styled.button`
  background-color: ${theme.primaryColor};
  color: white;
  float: right;
  padding: 10px 30px;
  margin: 20px 0;
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${theme.accentColor};
  }

  &:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

// Rest of the GenerateButton component...


const GenerateButton = ({ onGenerate }) => {
  return (
    <GenerateButtonStyled onClick={onGenerate}>
      Generate Images
    </GenerateButtonStyled>
  );
};

export default GenerateButton;
