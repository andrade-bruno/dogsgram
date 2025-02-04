"use server";

import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { cookies } from "next/headers";
import apiError from "@/utils/api-error";

export default async function login(
  state: IFormState,
  formData: FormData
): Promise<IFormState> {
  try {
    const response = await OrigamidApi.TOKEN_POST(formData);

    if (!response.ok) throw new Error("Invalid username or password");

    const data = await response.json();

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return {
      ok: true,
      data: data,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
