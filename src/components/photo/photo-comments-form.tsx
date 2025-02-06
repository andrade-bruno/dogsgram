"use client";

import { useFormState, useFormStatus } from "react-dom";
import styles from "./photo-comments-form.module.css";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import BarkingDogIcon from "@/icons/barking-dog";
import { IFormState } from "@/interfaces/form";
import { Comment } from "@/interfaces/origamid/photo";
import commentPost from "@/actions/comment-post";
import Loading from "@/components/helper/loading";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {!pending ? (
        <BarkingDogIcon height={40} width={40} />
      ) : (
        <Loading height={35} width={35} />
      )}
    </button>
  );
}

export default function PhotoCommentsForm({
  single,
  photoId,
  setComments,
}: {
  single: boolean;
  photoId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const initialState: IFormState<Comment> = {
    ok: false,
  };
  const [state, action] = useFormState(commentPost, initialState);
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    if (state.data) {
      setComments((comments) => [...comments, state.data as Comment]);
      setComment("");
    }
  }, [state.data, setComments]);

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <input type="hidden" name="id" id="id" value={photoId} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Start typing..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
