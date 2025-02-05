"use server";

import { handleActionError } from "@/utils/handle-action-error";
import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { grabAPIError } from "@/utils/grab-api-error";

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

    grabAPIError(response, output);

    return { ok: true, data: output };
  } catch (error: unknown) {
    return handleActionError(error);
  }
}
