import React from "react";
import { Link } from "react-router-dom";
import StyledLink from "../UI/StyledLink";

import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #f5f5f5;
  justify-content: flex-end;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/login">Accedi</StyledLink>
      <StyledLink to="/register">Registrati</StyledLink>
    </StyledHeader>
  );
};

export default Header;
