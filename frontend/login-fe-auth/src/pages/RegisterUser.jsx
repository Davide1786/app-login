import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSingleUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Form from "../UI/StyledForm";
import StyledInputLabel from "../UI/StyledInputLabel";
import Input from "../UI/Input";
import styled from "styled-components";
import StyledLink from "../UI/StyledLink";

const RegisterUser = () => {
  const StyledRegisterContainer = styled.div`
    height: 100lvh;
    position: fixed;
    top: 0;
    left: 0;
    width: 100lvw;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
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
  }
  console.log("errors: ", errors);
  return (
    <StyledRegisterContainer>
      <StyledLink to="/">Torna alla Home</StyledLink>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledInputLabel label={"Nome"} errors={errors?.nome?.message}>
          <Input
            type="text"
            {...register("nome", {
              required: "Il campo è obbligatorio",
              minLength: {
                value: 2,
                message: "Il nome deve contenere almeno 2 caratteri",
              },
              validate: (value) => value.trim().length >= 2 || "Il nome deve contenere almeno 2 caratteri",
            })}
          />
        </StyledInputLabel>

        <StyledInputLabel label={"Cognome"} errors={errors?.cognome?.message}>
          <Input
            type="text"
            {...register("cognome", {
              required: "Il campo è obbligatorio",
              minLength: {
                value: 2,
                message: "Il cognome deve contenere almeno 2 caratteri",
              },
              validate: (value) => value.trim().length >= 2 || "Il cognome deve contenere almeno 2 caratteri",
            })}
          />
        </StyledInputLabel>

        <StyledInputLabel label={"Email"} errors={errors?.email?.message}>
          <Input
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
        </StyledInputLabel>

        <StyledInputLabel label={"Password"} errors={errors?.password?.message}>
          <Input
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
        </StyledInputLabel>
        <Button type="submit">Registrati</Button>
      </Form>
    </StyledRegisterContainer>
  );
};

export default RegisterUser;
