"use client";

import React from "react";
import styles from "./photo-delete.module.css";
import photoDelete from "@/actions/photo-delete";
import Loading from "@/components/helper/loading";

export default function PhotoDelete({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);
  async function handleClick() {
    const confirm = window.confirm("Are you sure you want to delete?");
    setLoading(true);
    if (confirm) {
      await photoDelete(id);
    }
    setLoading(false);
  }
  return (
    <>
      <button
        className={styles.delete}
        onClick={handleClick}
        disabled={loading}
      >
        Delete
      </button>
      {loading && <Loading />}
    </>
  );
}
