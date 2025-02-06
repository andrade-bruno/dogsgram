"use client";

import styles from "./styles.module.css";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import { IFormState } from "@/interfaces/form";
import lostPassword from "@/actions/lost-password";
import SuccessMessage from "@/components/helper/success-message";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? "Sending..." : "Send Email"}</Button>
  );
}

export default function LostPasswordForm() {
  const initialState: IFormState = {
    ok: false,
  };
  const [state, action] = useFormState(lostPassword, initialState);
  const [resetPath, setResetPath] = React.useState("");

  React.useEffect(
    () => setResetPath(window.location.origin + "/login/reset"),
    []
  );

  return (
    <form action={action} className={styles.form}>
      <Input label="Email/User" name="login" type="text" />
      <Input label="Url" name="url" type="hidden" value={resetPath} />
      {state.ok ? <SuccessMessage>Email sent!</SuccessMessage> : <FormButton />}
      <ErrorMessage error={state.error} />
    </form>
  );
}
