import getPhotos from "@/actions/photos-get";
import Feed from "@/components/feed/feed";

export default async function Home() {
  const data = await getPhotos();

  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
