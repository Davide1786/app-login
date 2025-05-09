import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: #353535;
    font-weight: 500;
    padding: 14px;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: grey;
    border-radius: grey;
  }
`;
export default StyledLink;
