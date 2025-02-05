import getPhotos from "@/actions/photos-get";
import Feed from "@/components/feed/feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Account",
};

export default async function Page() {
  const {} = await getPhotos();
  return (
    <main>
      <Feed />
    </main>
  );
}
