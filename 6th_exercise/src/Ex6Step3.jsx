import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom :</label>
          <input {...register("name")} />
        </div>

        <div>
          <label>Email :</label>
          <input {...register("email")} />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input type="password" {...register("password")} />
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
