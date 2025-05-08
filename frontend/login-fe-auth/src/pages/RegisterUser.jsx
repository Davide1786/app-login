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
    formState: { errors },
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
  console.log("errors: ", errors);
  return (
    <div>
      RegisterUser
      {/* <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Nome</label>
        <input
          type="text"
          {...register("name", {
            required: "Il campo è obbligatorio",
          })}
        />
        <p style={{ color: "red" }}>{errors?.name?.message}</p>

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
      </form> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          {...register("name", {
            required: "Il campo è obbligatorio",
            minLength: {
              value: 2,
              message: "Il nome deve contenere almeno 2 caratteri",
            },
            validate: (value) => value.trim().length >= 2 || "Il nome deve contenere almeno 2 caratteri",
          })}
        />
        <p style={{ color: "red" }}>{errors?.name?.message}</p>

        <label htmlFor="surname">Cognome</label>
        <input
          type="text"
          {...register("surname", {
            required: "Il campo è obbligatorio",
            minLength: {
              value: 2,
              message: "Il cognome deve contenere almeno 2 caratteri",
            },
            validate: (value) => value.trim().length >= 2 || "Il cognome deve contenere almeno 2 caratteri",
          })}
        />
        <p style={{ color: "red" }}>{errors?.surname?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "Il campo è obbligatorio",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email non valida",
            },
          })}
        />
        <p style={{ color: "red" }}>{errors?.email?.message}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Il campo è obbligatorio",
            minLength: {
              value: 8,
              message: "La password deve essere lunga almeno 8 caratteri",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!-\*$?^])[A-Za-z0-9!-\*$?^]{8,}$/,
              message: "La password deve contenere almeno un numero e un carattere speciale (!-*$?^)",
            },
          })}
        />
        <p style={{ color: "red" }}>{errors?.password?.message}</p>

        <Link to="/">Torna alla Home</Link>
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default RegisterUser;
