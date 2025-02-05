"use server";

import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { cookies } from "next/headers";
import { handleActionError } from "@/utils/handle-action-error";
import { grabAPIError } from "@/utils/grab-api-error";

export default async function login(
  state: IFormState,
  formData: FormData
): Promise<IFormState> {
  try {
    const response = await OrigamidApi.TOKEN_POST(formData);
    const output = await response.json();

    grabAPIError(response, output);

    cookies().set("token", output.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return {
      ok: true,
      data: output,
    };
  } catch (error: unknown) {
    return handleActionError(error);
  }
}
