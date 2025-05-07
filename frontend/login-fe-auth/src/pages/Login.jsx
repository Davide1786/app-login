import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      Login
      <form action="">
        <label htmlFor="">Email</label>
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="password" />

        <Link to="/">Torna alla Home</Link>
        <button>Entra</button>
      </form>
    </div>
  );
};

export default Login;
