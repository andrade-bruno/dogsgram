"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import styles from "./photo-post.module.css";
import photoPost from "@/actions/photo-post";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Sending...</Button>
      ) : (
        <Button>Send</Button>
      )}
    </>
  );
}

export default function PhotoPostForm() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
  });

  const [img, setImg] = React.useState("");

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Name" name="nome" type="text" />
        <Input label="Weight" name="peso" type="number" />
        <Input label="Age" name="idade" type="number" />
        <input
          onChange={handleImgChange}
          type="file"
          name="img"
          id="img"
          className={styles.file}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  );
}
