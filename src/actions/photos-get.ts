"use server";

import { IPhoto } from "@/interfaces/photo";

export default async function getPhotos() {
  const response = await fetch(
    "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0",
    {
      next: {
        revalidate: 30,
        tags: ["photos"],
      },
    }
  );
  const data = (await response.json()) as IPhoto[];
  return data;
}
