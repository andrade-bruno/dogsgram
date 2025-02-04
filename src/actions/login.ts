"use server";

import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { cookies } from "next/headers";
import apiError from "@/utils/api-error";
import { defaults } from "@/utils/constants";
import translate from "translate";

export default async function login(
  state: IFormState,
  formData: FormData
): Promise<IFormState> {
  try {
    const response = await OrigamidApi.TOKEN_POST(formData);
    const output = await response.json();

    if (!response.ok)
      throw new Error(
        (await translate(output.message, { from: "pt", to: "en" })) ||
          defaults.GENERIC_ERROR
      );

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
    return apiError(error);
  }
}
