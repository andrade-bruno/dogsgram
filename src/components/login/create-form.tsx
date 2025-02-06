"use client";

import styles from "./styles.module.css";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import { IFormState } from "@/interfaces/form";
import createUser from "@/actions/create-user";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>{pending ? "Creating..." : "Create"}</Button>
  );
}

export default function CreateUserForm() {
  const initialState: IFormState = {
    ok: false,
  };
  const [state, action] = useFormState(createUser, initialState);

  React.useEffect(() => {
    if (state.ok) window.location.href = "/account";
  }, [state.ok]);

  return (
    <form action={action} className={styles.form}>
      <Input label="User" name="username" type="text" />
      <Input label="Email" name="email" type="email" />
      <Input label="Password" name="password" type="password" />
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
