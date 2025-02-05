import { IPhoto } from "@/interfaces/origamid/photo";
import FeedPhotos from "./feed-photos";

export default function Feed({ photos }: { photos?: IPhoto[] }) {
  if (!photos?.length) return <div>No photos to display</div>;

  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}
