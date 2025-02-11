import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().trim().required("Le nom est requis").min(3, "Minimum 3 caractères"),
  emails: yup.array().of(
    yup.object({
      email: yup.string().trim().email("Email invalide").required("L'email est requis"),
    })
  ),
  password: yup.string().trim().required("Le mot de passe est requis").min(6, "Minimum 6 caractères"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { emails: [{ email: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const onSubmit = (data) => {
    alert(`Inscription réussie !\n\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom :</label>
          <input {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email(s) :</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`emails.${index}.email`)} />
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}>
                  🗑️
                </button>
              )}
              {errors.emails?.[index]?.email && <p style={{ color: "red" }}>{errors.emails[index].email.message}</p>}
            </div>
          ))}
          <button type="button" onClick={() => append({ email: "" })}>
            Ajouter un email
          </button>
          {errors.emails && <p style={{ color: "red" }}>{errors.emails.message}</p>}
        </div>

        <div>
          <label>Mot de passe :</label>
          <input type="password" {...register("password")} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
