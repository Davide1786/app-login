import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getUserProfile, logoutUser } from "../api/api";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../UI/Button";

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

  const handleClickNext = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <h2>Benvenuto, {user.name}</h2>
      <p>Email: {user.email}</p>

      <Button onClick={handleLogout}>Esci</Button>

      <div>
        <h1>Visita la tua dash</h1>
        <Button onClick={handleClickNext}>Vai dash</Button>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
