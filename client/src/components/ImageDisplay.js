import React from 'react';
import styled from 'styled-components';

// ... other imports
import { theme } from '../GlobalStyle';

const ImageDisplayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center; // This will center the images in their container
`;

const StyledImage = styled.img`
  max-width: 100%; // Control the size of the images (could be in pixels or percentages)
  width: auto; // This will maintain the aspect ratio of the images
  height: auto; // This will maintain the aspect ratio of the images
  max-height: 300px; // Optional: limit the height of images if they are too tall
  border-radius: ${theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// The rest of your ImageDisplay component remains the same


const ImageDisplay = ({ images }) => {
  return (
    <ImageDisplayContainer>
      {/* Map over images and render them */}
      {images.map((image, index) => (
        <StyledImage key={index} src={image.url} alt={`Trouble opening ${image.url}`} />
      ))}
    </ImageDisplayContainer>
  );
};

export default ImageDisplay;
