"use client";

import React from "react";
import styles from "./photo-content.module.css";
import PhotoComments from "./photo-comments";
import PhotoDelete from "./photo-delete";
import Link from "next/link";
import { useUserContext } from "@/context/user";
import Image from "next/image";
import { PhotoData } from "@/interfaces/origamid/photo";
import { capitalizeName } from "@/utils/capitalize-name";

const PhotoContent = ({
  data,
  single,
}: {
  data: PhotoData;
  single: boolean;
}) => {
  const { user } = useUserContext();
  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={String(photo.id)} />
            ) : (
              <Link href={`/profile/${photo.author}`}>
                @{capitalizeName(photo.author)}
              </Link>
            )}
            <span className={styles.visibility}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/photo/${photo.id}`}>
              {capitalizeName(photo.title)}
            </Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} year(s) old</li>
          </ul>
        </div>
        <div>
          <h1 className="title">Comments</h1>
          <PhotoComments
            single={single}
            photoId={photo.id}
            comments={comments}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoContent;
