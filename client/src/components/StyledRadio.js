import styled from 'styled-components';

const RadioLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.darkGray};
  margin: 10px 0;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const StyledRadio = ({ name, value, checked, onChange, children }) => {
  return (
    <RadioLabel>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </RadioLabel>
  );
};

export default StyledRadio;
