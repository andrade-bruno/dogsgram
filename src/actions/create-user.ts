"use server";

import OrigamidApi from "@/services/origamid-api";
import { handleActionError } from "@/utils/handle-action-error";
import login from "./login";
import { IFormState } from "@/interfaces/form";
import { grabAPIError } from "@/utils/grab-api-error";

export default async function createUser(
  _state: IFormState,
  formData: FormData
): Promise<IFormState> {
  const username = formData.get("username") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !email || !password)
      throw new Error("Fill all required fields.");

    if (password.length < 6) throw new Error("Password must have 6 digits.");

    const response = await OrigamidApi.USER_POST({
      username,
      email,
      password,
    });
    const output = await response.json();

    await grabAPIError(response, output);

    return await login({ ok: true }, formData);
  } catch (error: unknown) {
    return handleActionError(error);
  }
}
