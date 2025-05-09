import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1rem;
  color: red;
`;

const StyledInputLabel = ({ label, errors, children }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {errors && <Error> {errors} </Error>}
    </StyledFormRow>
  );
};

export default StyledInputLabel;
