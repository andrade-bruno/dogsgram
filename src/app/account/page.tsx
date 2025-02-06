import getPhotos from "@/actions/photos-get";
import userGet from "@/actions/user-get";
import Feed from "@/components/feed/feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Account",
};

export default async function Page() {
  const { data: user } = await userGet();
  const { data: photos } = await getPhotos({ user: user?.username });

  return (
    <section className="animeLeft">
      <Feed photos={photos} username={user?.username} />
    </section>
  );
}
