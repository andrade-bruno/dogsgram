"use client";

import styles from "./styles.module.css";
import login from "@/actions/login";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import { IFormState } from "@/interfaces/form";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{!pending ? "Login" : "Please wait..."}</Button>
  );
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
      <form action={action} className={styles.form}>
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
      <Link href="/login/lost-password" className={styles.lost}>
        Forget password?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Register</h2>
        <p>Don't have account yet? Register now.</p>
        <Link className="button" href="/login/create">
          Let's do it!
        </Link>
      </div>
    </>
  );
}
