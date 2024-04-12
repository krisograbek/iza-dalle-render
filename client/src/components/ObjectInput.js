import React from 'react';
import styled from 'styled-components';

import { theme } from '../GlobalStyle';

const ObjectInputContainer = styled.div`
  margin-bottom: 20px;
`;

const ObjectInputField = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
  box-sizing: border-box;
`;

const ObjectInput = ({ objects, setObjects }) => {
  return (
    <ObjectInputContainer>
      <ObjectInputField
        type="text"
        placeholder="Enter objects separated by commas"
        value={objects}
        onChange={(e) => setObjects(e.target.value)}
      />
    </ObjectInputContainer>
  );
};

export default ObjectInput;
