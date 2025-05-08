import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClickPrev = () => {
    navigate(-1);
  };
  return (
    <div>
      Dashboard
      {/* <Link to="profile">torna al profilo</Link> */}
      {/* <Link to="-1">Vai al profilo</Link> */}
      <button onClick={handleClickPrev}>Torna indietro</button>
    </div>
  );
};

export default Dashboard;
