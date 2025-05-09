import styled from "styled-components";

const Button = styled.button`
  width: 220px;
  height: 15px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeaea;
  background-color: #fdfdfd;
  cursor: pointer;
  text-transform: uppercase;
  color: #393939;

  &:hover {
    background-color: #ebeaea;
  }
`;
export default Button;
