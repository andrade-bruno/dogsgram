"use server";

import { IFormState } from "@/interfaces/form";
import { GetPhotosResponse, IPhoto } from "@/interfaces/origamid/photo";
import { handleActionError } from "@/utils/handle-action-error";
import { grabAPIError } from "@/utils/grab-api-error";
import OrigamidApi from "@/services/origamid-api";
import { OrigamidFilterParams } from "@/interfaces/origamid/filter-params";

export default async function getPhotos({
  page = 1,
  total = 6,
  user = 0,
}: OrigamidFilterParams = {}): Promise<IFormState<IPhoto[]>> {
  try {
    const response = await OrigamidApi.PHOTOS_GET({ page, total, user });
    const output = (await response.json()) as GetPhotosResponse;

    grabAPIError(response, output);

    return {
      ok: true,
      data: output as IPhoto[],
    };
  } catch (error) {
    return handleActionError<IPhoto[]>(error);
  }
}
