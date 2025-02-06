"use client";

import { IPhoto } from "@/interfaces/origamid/photo";
import FeedPhotos from "./feed-photos";
import styles from "./feed.module.scss";
import Link from "next/link";
import React from "react";
import getPhotos from "@/actions/photos-get";
import { User } from "@/interfaces/origamid/user";

type FeedProps = { photos?: IPhoto[]; username?: User["username"] };

export default function Feed({ photos, username }: FeedProps) {
  const [photosFeed, setPhotosFeed] = React.useState<IPhoto[] | undefined>(
    photos
  );
  const [page, setPage] = React.useState(1);
  const [infinite, setInfinite] = React.useState(
    photos?.length == 6 ? true : false // API returns 6 photos per request
  );
  const [loading, setLoading] = React.useState(false);
  const fetching = React.useRef(false);

  const infiniteScroll = () => {
    if (fetching.current) return;

    fetching.current = true;
    setLoading(true);

    setTimeout(() => {
      setPage((current) => (current += 1));
      fetching.current = false;
      setLoading(false);
    }, 1500);
  };

  React.useEffect(() => {
    if (page == 1) return;

    async function fetchMore(page: number) {
      const { data: newPhotos } = await getPhotos(
        {
          page,
          total: 6,
          user: username,
        },
        {
          cache: "no-store",
          next: {
            tags: ["photos"],
          },
        }
      );
      if (newPhotos?.length) {
        setPhotosFeed((old) => [...(old as IPhoto[]), ...newPhotos]);
        if (newPhotos.length < 6) setInfinite(false);
      }
    }
    fetchMore(page);
  }, [page]);

  React.useEffect(() => {
    if (infinite) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  if (!photosFeed?.length)
    return (
      <div className={`${styles.container} animeLeft`}>
        <p className={styles.emptyWarn}>No photos yet</p>
        <Link href="/account/post" className={`${styles.postBtn} button`}>
          Post a new one
        </Link>
      </div>
    );

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      {loading && `Loading ${username ?? ""} photos...`}
    </div>
  );
}
