// import { useQuery } from "@tanstack/react-query";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { matchLogin } from "../api/api";
import { useForm } from "react-hook-form";
// import { matchLogin } from "../api/api";

const Login = () => {
  const navigate = useNavigate();

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
      // const { token, user } = data;
      const { user } = data;

      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));

      toast.success("Ciao " + user.name);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
      navigate(`/profile`);
    },
  });

  function onSubmit(data) {
    mutate({ ...data });
    console.log(data, "as");
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
        <button>Entra</button>
      </form>
    </div>
  );
};

export default Login;
