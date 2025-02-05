"use server";

import { handleActionError } from "@/utils/handle-action-error";
import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { grabAPIError } from "@/utils/grab-api-error";

export default async function resetPassword(
  state: {},
  formData: FormData
): Promise<IFormState> {
  const login = formData.get("login") as string | null;
  const key = formData.get("key") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  try {
    if (!password || !confirmPassword)
      throw new Error("Fill all the required fields");

    if (password !== confirmPassword)
      throw new Error("Passwords does not match.");

    if (!login || !key)
      throw new Error("Missing keys from reset email provided, sent to you :(");

    const response = await OrigamidApi.PASSWORD_RESET({
      login,
      key,
      password,
    });

    const output = await response.json();

    grabAPIError(response, output);

    return { ok: true, data: output };
  } catch (error: unknown) {
    return handleActionError(error);
  }
}
