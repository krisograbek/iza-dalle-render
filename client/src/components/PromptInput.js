import React from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const PromptInputContainer = styled.div`
  margin-bottom: 20px;
`;

const PromptInputField = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 15px;
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
  box-sizing: border-box;
`;

const PromptInput = ({ prompt, setPrompt }) => {
  return (
    <PromptInputContainer>
      <PromptInputField
        type="text"
        placeholder="Your Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </PromptInputContainer>
  );
};

export default PromptInput;
