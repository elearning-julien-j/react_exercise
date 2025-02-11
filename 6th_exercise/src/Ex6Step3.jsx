import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const API_URL = "https://restapi.fr/api/usersreactc14";

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { emails: [{ email: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?delay=2`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des utilisateurs");
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError("");
    try {
      const formattedData = {
        ...data,
        emails: data.emails.map((emailObj) => emailObj.email),
      };

      const response = await fetch(`${API_URL}?delay=2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'inscription");

      const createdUser = await response.json();

      setUsers((prevUsers) => [...prevUsers, { ...createdUser, emails: formattedData.emails }]);

      reset({ name: "", emails: [{ email: "" }], password: "" });
    } catch {
      setError("Échec de l'inscription");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Inscription</h1>

      {loading && <p>Chargement des utilisateurs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {submitting && <p style={{ color: "blue" }}>Inscription en cours...</p>}

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

        <button type="submit" disabled={isSubmitting}>
          S&apos;inscrire
        </button>
      </form>

      <h2>Utilisateurs enregistrés</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user._id || index}>
            {user.name} - {Array.isArray(user.emails) ? user.emails.join(", ") : "Aucun email"}
          </li>
        ))}
      </ul>
    </div>
  );
}
