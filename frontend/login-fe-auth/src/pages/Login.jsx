import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { matchLogin } from "../api/api";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    // formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: matchLogin,
    onSuccess: (data) => {
      const { user } = data;
      toast.success("Ciao " + user.name);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
      navigate(`/profile`);
    },
    onError: (err) => {
      // Imposta il messaggio di errore generico
      setLoginError("Email o password non corrette");
      console.error("Errore di login:", err);
      // Posso mostrare un toast di errore più generico se voglio
      // toast.error("Email o password non corrette");
    },
  });

  function onSubmit(data) {
    setLoginError("");
    mutate({ ...data });
  }

  return (
    <div>
      Login
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "Il campo è obbligatorio",
            message: "Email non valida",
          })}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Il campo è obbligatorio",
            message: "pas non valida",
          })}
        />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>} {/* Mostra l'errore di login */}
        <Link to="/">Torna alla Home</Link>
        <button>Entra</button>
      </form>
    </div>
  );
};

export default Login;
