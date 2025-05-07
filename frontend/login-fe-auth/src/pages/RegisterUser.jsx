import React from "react";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  return (
    <div>
      RegisterUser
      <form action="">
        <label htmlFor="">Nome</label>
        <input type="text" />
        <label htmlFor="">Cognome</label>
        <input type="text" />
        <label htmlFor="">Email</label>
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="password" />

        <Link to="/">Torna alla Home</Link>
        <button>Registrati</button>
      </form>
    </div>
  );
};

export default RegisterUser;
