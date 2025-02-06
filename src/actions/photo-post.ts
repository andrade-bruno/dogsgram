"use server";

import { IFormState } from "@/interfaces/form";
import { PostPhotoResponse } from "@/interfaces/origamid/photo";
import OrigamidApi from "@/services/origamid-api";
import { handleActionError } from "@/utils/handle-action-error";
import { defaults } from "@/utils/constants";
import { grabAPIError } from "@/utils/grab-api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function photoPost(
  state: {},
  formData: FormData
): Promise<IFormState> {
  const token = cookies().get("token")?.value;

  const name = formData.get("nome") as string | null;
  const age = formData.get("idade") as string | null;
  const weight = formData.get("peso") as string | null;
  const img = formData.get("img") as File;

  try {
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    if (!name || !age || !weight || img.size === 0)
      throw new Error("Fill all required fields.");

    const response = await OrigamidApi.PHOTO_POST(formData, token);

    const output = (await response.json()) as PostPhotoResponse;

    await grabAPIError(response, output);

    revalidateTag("photos");
  } catch (error: unknown) {
    return handleActionError(error);
  } finally {
    redirect("/account");
  }
}
