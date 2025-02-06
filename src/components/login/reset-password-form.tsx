"use client";

import styles from "./styles.module.css";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import { IFormState } from "@/interfaces/form";
import resetPassword from "@/actions/reset-password";
import SuccessMessage from "@/components/helper/success-message";
import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? "Resetting..." : "Reset"}</Button>
  );
}

type FormProps = {
  searchParams: Record<string, unknown>;
};

export default function ResetPasswordForm({ searchParams }: FormProps) {
  const initialState: IFormState = {
    ok: false,
  };
  const [state, action] = useFormState(resetPassword, initialState);
  const { key, login } = searchParams;

  return (
    <form action={action} className={styles.form}>
      <Input label="New Password" name="password" type="password" />
      <Input label="Confirm" name="confirmPassword" type="password" />
      <Input label="Key" type="hidden" name="key" value={key as string} />
      <Input label="Login" type="hidden" name="login" value={login as string} />
      {state.ok ? (
        <SuccessMessage>
          Password changed! <br /> <br />
          Log in now? <Link href="/login">Click me</Link>.
        </SuccessMessage>
      ) : (
        <FormButton />
      )}
      <ErrorMessage error={state.error} />
    </form>
  );
}
