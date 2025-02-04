"use server";

import apiError from "@/utils/api-error";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { IFormState } from "@/interfaces/form";
import { redirect } from "next/navigation";
import translate from "translate";

export default async function resetPassword(
  state: {},
  formData: FormData
): Promise<IFormState> {
  const login = formData.get("login") as string | null;
  const key = formData.get("key") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  try {
    if (!login || !key || !password || !confirmPassword)
      throw new Error("Fill all the required fields");

    if (password !== confirmPassword)
      throw new Error("Passwords does not match.");

    const response = await OrigamidApi.PASSWORD_RESET({
      login,
      key,
      password,
    });

    const output = await response.json();

    if (!response.ok)
      throw new Error(
        (await translate(output.message, { from: "pt", to: "en" })) ||
          defaults.GENERIC_ERROR
      );

    return { ok: true, data: output };
  } catch (error: unknown) {
    return apiError(error);
  }
}
