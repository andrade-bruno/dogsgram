import { IPhoto } from "@/interfaces/origamid/photo";
import FeedPhotos from "./feed-photos";
import styles from "./feed.module.scss";
import Link from "next/link";

export default function Feed({ photos }: { photos?: IPhoto[] }) {
  if (!photos?.length)
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
      <FeedPhotos photos={photos} />
    </div>
  );
}
