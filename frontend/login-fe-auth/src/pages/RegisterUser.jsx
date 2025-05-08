import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSingleUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    // formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: createSingleUser,
    onSuccess: () => {
      toast.success("Utente creato con successo");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      reset();
      navigate(`/login`);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data });
    // console.log("data: ", data);
  }
  return (
    <div>
      RegisterUser
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Nome</label>
        <input
          type="text"
          {...register("name", {
            required: "Il campo è obbligatorio",
          })}
        />
        <label htmlFor="">Cognome</label>
        <input
          type="text"
          {...register("surname", {
            required: "Il campo è obbligatorio",
          })}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "Il campo è obbligatorio",
          })}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Il campo è obbligatorio",
          })}
        />

        <Link to="/">Torna alla Home</Link>
        <button>Registrati</button>
      </form>
    </div>
  );
};

export default RegisterUser;
