import React from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const StyleSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyleLabel = styled.label`
  margin-right: 10px;
  display: inline-block;
  background-color: ${theme.lightGray};
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.accentColor};
    color: white;
  }

  input {
    margin-right: 5px;
  }
`;

const StyleSelector = ({ styles, onSelectStyle, selectedStyles }) => {
  return (
    <StyleSelectorContainer>
      {/* Map over styles and render checkboxes */}
      {styles.map(style => (
        <StyleLabel key={style.name}>
          <input
            type="checkbox"
            value={style.name}
            onChange={onSelectStyle}
            checked={selectedStyles.includes(style.name)}
          />
          {style.name}
          {/* Here you can add an image to show the style using style.exampleImageURL */}
        </StyleLabel>
      ))}
    </StyleSelectorContainer>
  );
};

export default StyleSelector;
