// src/components/AspectRatioSelector.js
import React from 'react';
import styled from 'styled-components';
import { theme } from '../GlobalStyle';

const AspectContainer = styled.div`
  display: flex;
  // justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
`;

const AspectOption = styled.button`
  width: 40px;
  border: 2px solid ${theme.darkGray};
  background-color: ${props => props.active ? theme.primaryColor : theme.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, border-color 0.3s;
  &:hover {
    border-color: ${theme.accentColor};
    background-color: ${props => props.active ? theme.primaryColor : theme.accentColor};
  }

  // Dynamic styles based on the aspect passed
  ${props => aspectStyles[props.aspect]}
`;

const aspectStyles = {
  square: `
    height: 40px;
  `,
  vertical: `
    height: 70px;
  `,
  horizontal: `
    width: 70px;
    height: 40px;
  `
};

const AspectRatioSelector = ({ currentAspect, onAspectChange }) => {
  return (
    <AspectContainer>
      <AspectOption
        aspect="horizontal"
        active={currentAspect === 'horizontal'}
        onClick={() => onAspectChange('horizontal')}
      />
      <AspectOption
        aspect="square"
        active={currentAspect === 'square'}
        onClick={() => onAspectChange('square')}
      />
      <AspectOption
        aspect="vertical"
        active={currentAspect === 'vertical'}
        onClick={() => onAspectChange('vertical')}
      />
    </AspectContainer>
  );
};

export default AspectRatioSelector;
