import React, { useState } from 'react';
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
  cursor: pointer;
`;

const NotificationBox = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%; // Center the box
  transform: translateX(-50%); // Adjust for the width of the box
  background: ${theme.notificationBackgroundColor};
  color: white;
  padding: 10px;
  border-radius: ${theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; // Use visibility
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 0s, opacity 0.5s linear;
  transition-delay: ${(props) => (props.show ? '0s' : '0.5s')}; // Delay the disappearance
`;

// Copy to clipboard utility function
const copyToClipboard = (text, setCopied) => {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log('Copied to clipboard'); // Add this to ensure the function is called
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
    },
    (err) => {
      console.error('Failed to copy text: ', err);
    }
  );
};

const ImageDisplay = ({ images }) => {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <ImageDisplayContainer>
        {images.map((image, index) => (
          <StyledImage
            src={image.url}
            alt={`Trouble opening ${image.url}`}
            onClick={() => copyToClipboard(image.revisedPrompt, setCopied)}
          />
        ))}
      </ImageDisplayContainer>
      <NotificationBox show={copied}>
        Prompt copied to clipboard!
      </NotificationBox>
    </>
  );
};


export default ImageDisplay;
