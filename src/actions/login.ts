"use server";

import { IFormState } from "@/interfaces/form";
import { cookies } from "next/headers";

export default async function login(
  state: IFormState,
  formData: FormData
): Promise<IFormState> {
  try {
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        body: formData,
      }
    );

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
    let message = "Unexpected error";
    if (error instanceof Error) message = error.message;
    return {
      ok: false,
      error: message,
    };
  }
}
