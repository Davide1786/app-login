import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  const logout = () => {
    localStorage.removeItem("token"); // oppure sessionStorage.removeItem("token")
    navigate("/"); // se usi react-router
  };

  console.log(user.id, "ciao");

  return (
    <div>
      <h2>Benvenuto, {user.name}</h2>
      <p>Email: {user.email}</p>

      <button onClick={logout}>Esci</button>
    </div>
  );
};

export default Profile;
