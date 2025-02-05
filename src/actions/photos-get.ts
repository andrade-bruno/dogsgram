"use server";

import { IFormState } from "@/interfaces/form";
import { GetPhotosResponse } from "@/interfaces/photo";
import { handleActionError } from "@/utils/handle-action-error";
import { grabAPIError } from "@/utils/grab-api-error";

export default async function getPhotos(): Promise<IFormState> {
  try {
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0",
      {
        next: {
          revalidate: 30,
          tags: ["photos"],
        },
      }
    );
    const output = (await response.json()) as GetPhotosResponse;

    grabAPIError(response, output);

    return {
      ok: true,
      data: output,
    };
  } catch (error) {
    return handleActionError(error);
  }
}
