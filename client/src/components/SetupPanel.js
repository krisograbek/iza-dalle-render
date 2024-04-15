// src/components/SetupPanel.js
import styled from 'styled-components';

const Panel = styled.div`
  background-color: ${({ theme }) => theme.lightGray};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 20px;
  margin-top: 20px;
  width: 250px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.5em;
`;

const SetupPanel = ({ children }) => {
  return (
    <Panel>
      <Title>Settings</Title>
      {children}
    </Panel>
  );
};

export default SetupPanel;
