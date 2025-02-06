"use client";

import { useFormState, useFormStatus } from "react-dom";
import styles from "./photo-comments-form.module.css";
import ErrorMessage from "../helper/error-message";
import React from "react";
import SendIcon from "@/icons/send";
import { IFormState } from "@/interfaces/form";
import { Comment } from "@/interfaces/origamid/photo";
import commentPost from "@/actions/comment-post";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <SendIcon />
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
  console.log("🚀 ~ state:", state);
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
