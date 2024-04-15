// src/components/StyledCheckbox.js
import styled from 'styled-components';

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: ${({ theme }) => theme.darkGray};
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const StyledCheckbox = ({ name, checked, onChange, children }) => {
  return (
    <CheckboxLabel>
      <CheckboxInput
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </CheckboxLabel>
  );
};

export default StyledCheckbox;