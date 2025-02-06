"use client";

import React from "react";
import PhotoCommentsForm from "./photo-comments-form";
import styles from "./photo-comments.module.css";
import { useUserContext } from "@/context/user";
import { Comment } from "@/interfaces/origamid/photo";
import { capitalizeName } from "@/utils/capitalize-name";

const PhotoComments = (props: {
  single: boolean;
  photoId: number;
  comments: Comment[];
}) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef<HTMLUListElement>(null);
  const { user } = useUserContext();

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{capitalizeName(comment.comment_author)}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          single={props.single}
          photoId={props.photoId}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
