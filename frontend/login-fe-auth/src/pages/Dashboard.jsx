import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClickPrev = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Sono la pagina della Dashboard </h1>
      <Button onClick={handleClickPrev}>Torna indietro</Button>
    </div>
  );
};

export default Dashboard;
