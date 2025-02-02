import { Photo } from "@/interfaces/photo";
import FeedPhotos from "./feed-photos";

export default function Feed({ photos }: { photos: Photo[] }) {
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}
