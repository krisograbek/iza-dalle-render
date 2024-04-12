import React from 'react';
import styled from 'styled-components';

// ... other imports
import { theme } from '../GlobalStyle';

const ImageDisplayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  border-radius: ${theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Rest of the ImageDisplay component...

const ImageDisplay = ({ images }) => {
  return (
    <ImageDisplayContainer>
      {/* Map over images and render them */}
      {images.map((image, index) => (
        <StyledImage key={index} src={image.url} alt={`Generated Style ${index}`} />
      ))}
    </ImageDisplayContainer>
  );
};

export default ImageDisplay;
