import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { matchLogin } from "../api/api";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import StyledLink from "../UI/StyledLink";
import styled from "styled-components";
import Form from "../UI/StyledForm";
import StyledInputLabel from "../UI/StyledInputLabel";
import Input from "../UI/Input";
const StyledLoginContainer = styled.div`
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
    <StyledLoginContainer>
      <StyledLink to="/">Torna alla Home</StyledLink>
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <StyledInputLabel label={"Email"}>
          <Input
            type="text"
            {...register("email", {
              required: "Il campo è obbligatorio",
              message: "Email non valida",
            })}
          />
        </StyledInputLabel>
        <StyledInputLabel label={"Password"}>
          <Input
            type="password"
            {...register("password", {
              required: "Il campo è obbligatorio",
              message: "pas non valida",
            })}
          />
        </StyledInputLabel>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>} {/* Mostra l'errore di login */}
        <Button>Entra</Button>
      </Form>
    </StyledLoginContainer>
  );
};

export default Login;
