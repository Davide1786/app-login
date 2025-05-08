import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getUserProfile, logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("Logout eseguito");
      navigate("/login");
    },
    onError: () => {
      toast.error("Errore durante il logout");
    },
  });

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      toast.error("Token scaduto, devi rieseguire l'accesso");
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div>
      <h2>Benvenuto, {user.name}</h2>
      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>Esci</button>
    </div>
  );
};

export default Profile;
