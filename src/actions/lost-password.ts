"use server";

import apiError from "@/utils/api-error";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { IFormState } from "@/interfaces/form";

export default async function lostPassword(
  state: {},
  formData: FormData
): Promise<IFormState> {
  const login = formData.get("login") as string | null;
  const url = formData.get("url") as string | null;

  try {
    if (!login) throw new Error("Fill all the required fields");
    const response = await OrigamidApi.PASSWORD_LOST({
      login,
      url,
    });

    const output = await response.json();

    if (!response.ok) throw new Error(output.message || defaults.GENERIC_ERROR);
    return { ok: true, data: output };
  } catch (error: unknown) {
    return apiError(error);
  }
}
