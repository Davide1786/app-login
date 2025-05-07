import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header
      <Link to="/login">Accedi</Link>
      <Link to="/register">Registrati</Link>
    </div>
  );
};

export default Header;
