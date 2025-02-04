"use server";

import OrigamidApi from "@/services/origamid-api";
import apiError from "@/utils/api-error";
import login from "./login";
import { IFormState } from "@/interfaces/form";

export default async function createUser(
  state: IFormState,
  formData: FormData
) {
  const username = formData.get("username") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !email || !password)
      throw new Error("Fill all required fields.");

    if (password.length < 6) throw new Error("Password must have 6 digits.");

    const bodyInit = {
      username,
      email,
      password,
    };
    const response = await OrigamidApi.USER_POST(bodyInit);
    const output = await response.json();

    if (!response.ok) throw new Error(output.message || "Something went wrong");

    return await login({ ok: true }, formData);
  } catch (error: unknown) {
    return apiError(error);
  }
}
