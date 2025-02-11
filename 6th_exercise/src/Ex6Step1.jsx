import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function App() {
  const schema = yup.object().shape({
    name: yup.string().min(3, "Minimum 3 caractères (pour le nom)").required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Minimum 6 caractères (pour le mot de passe)").required("Le mot de passe est requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    alert("Inscription réussie");
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom :</label>
          <input {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email :</label>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Mot de passe :</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
