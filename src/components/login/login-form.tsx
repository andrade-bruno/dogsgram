"use client";

import login from "@/actions/login";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import { IFormState } from "@/interfaces/form";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";

function FormButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{!pending ? "Entrar" : "Aguarde"}</Button>;
}

export default function LoginForm() {
  const initialState: IFormState = {
    ok: false,
  };
  const [state, action] = useFormState(login, initialState);

  React.useEffect(() => {
    if (state.ok) window.location.href = "/account";
  }, [state.ok]);

  return (
    <>
      <form action={action}>
        <Input
          type="text"
          name="username"
          placeholder="Your best email/tag"
          label="User"
          required
        />
        <Input type="password" name="password" label="Password" required />
        <FormButton />
        <ErrorMessage error={state?.error} />
      </form>
    </>
  );
}
