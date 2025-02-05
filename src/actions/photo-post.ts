"use server";

import { IFormState } from "@/interfaces/form";
import { IOrigamidError } from "@/interfaces/origamid";
import { PostPhotoOutput } from "@/interfaces/photo";
import OrigamidApi from "@/services/origamid-api";
import apiError from "@/utils/api-error";
import { defaults } from "@/utils/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import translate from "translate";

export default async function photoPost(
  state: {},
  formData: FormData
): Promise<IFormState> {
  const token = cookies().get("token")?.value;

  const nome = formData.get("nome") as string | null;
  const idade = formData.get("idade") as string | null;
  const peso = formData.get("peso") as string | null;
  const img = formData.get("img") as File;

  try {
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    if (!nome || !idade || !peso || img.size === 0)
      throw new Error("Fill all required fields.");

    const response = await OrigamidApi.PHOTO_POST(formData, token);

    const output = (await response.json()) as IOrigamidError | PostPhotoOutput;

    if (!response.ok) {
      const message =
        "message" in output
          ? await translate(output.message, { from: "pt", to: "en" })
          : defaults.GENERIC_ERROR;

      throw new Error(message);
    }

    revalidateTag("photos");
  } catch (error: unknown) {
    return apiError(error);
  } finally {
    redirect("/");
  }
}
