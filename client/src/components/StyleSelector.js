import React, { useState } from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const StyleSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding-top: 24px;

  @media (max-width: 768px) {
    gap: 5px;
    margin-bottom: 10px;
    padding-top: 12px;
`;

const StyleLabel = styled.label`
  margin-right: 10px;
  display: inline-block;
  // background-color: ${theme.lightGray};
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;

  background-color: ${({ isChecked }) => isChecked ? theme.primaryColor : theme.lightGray};
  color: ${({ isChecked }) => isChecked ? 'white' : theme.primaryColor};


  &:hover {
    background-color: ${theme.accentColor};
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
  }

  input {
    // Hide checkbox visually but remain accessible to screen readers.
    // Source: https://www.w3.org/TR/WCAG20-TECHS/CSS2.html#CSS2visually-hidden
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
  }
  
  // Use the :checked pseudo-class to style the label when the checkbox is checked
  input:checked + & {
    background-color: ${theme.primaryColor};
    color: white;
  }
`;

const StyleSelector = ({ styles, onSelectStyle, selectedStyles }) => {
  const [visibleCount, setVisibleCount] = useState(10); // Start with 10 for mobile by default

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + (window.innerWidth <= 768 ? 10 : 15));
  };

  const visibleStyles = styles.slice(0, visibleCount);

  return (
    <StyleSelectorContainer>
      {/* Map over styles and render checkboxes */}
      {visibleStyles.map(style => (
        <StyleLabel key={style.name} isChecked={selectedStyles.includes(style.name)}>
          <input
            id={`style-checkbox-${style.name}`} // A unique ID for the input
            type="checkbox"
            value={style.name}
            onChange={onSelectStyle}
            checked={selectedStyles.includes(style.name)}
          />
          {style.name}
        </StyleLabel>
      ))}
      {visibleCount < styles.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </StyleSelectorContainer>
  );
};

export default StyleSelector;
