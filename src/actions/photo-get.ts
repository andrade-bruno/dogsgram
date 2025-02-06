"use server";

import { IFormState } from "@/interfaces/form";
import { GetPhotoResponse, PhotoData } from "@/interfaces/origamid/photo";
import OrigamidApi from "@/services/origamid-api";
import { grabAPIError } from "@/utils/grab-api-error";
import { handleActionError } from "@/utils/handle-action-error";

export default async function photoGet(
  id: string
): Promise<IFormState<PhotoData>> {
  try {
    const response = await OrigamidApi.PHOTO_GET(id);
    const output = (await response.json()) as GetPhotoResponse;
    console.log("🚀 ~ photoGet ~ output:", output);

    await grabAPIError(response, output);

    return { data: output as PhotoData, ok: true };
  } catch (error) {
    return handleActionError(error);
  }
}
