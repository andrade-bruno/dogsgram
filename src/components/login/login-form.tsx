"use client";

import login from "@/actions/login";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import { IFormState } from "@/interfaces/form";

function FormButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{!pending ? "Entrar" : "Aguarde"}</Button>;
}

export default function LoginForm() {
  const initialState: IFormState = {
    ok: false,
  };
  const [state, action] = useFormState(login, initialState);

  return (
    <>
      <form action={action}>
        <input type="text" name="username" placeholder="usuário" required />
        <input type="password" name="password" placeholder="senha" required />
        <FormButton />
        <p>{state.error}</p>
      </form>
    </>
  );
}
