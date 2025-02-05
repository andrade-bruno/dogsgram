"use server";

import { cookies } from "next/headers";
import OrigamidApi from "@/services/origamid-api";
import translate from "translate";
import { defaults } from "@/utils/constants";
import { IFormState } from "@/interfaces/form";
import { User } from "@/interfaces/user";

export default async function userGet(): Promise<IFormState<User>> {
  console.warn("Revalidating token");

  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token not found.");

    const response = await OrigamidApi.USER_GET(token);
    const output = await response.json();

    if (!response.ok)
      throw new Error(
        (await translate(output.message, { from: "pt", to: "en" })) ||
          defaults.GENERIC_ERROR
      );

    console.warn("Token revalidated");

    return { data: output as User, ok: true };
  } catch (error: unknown) {
    console.warn("Could not revalidate token");

    return {
      ok: false,
    };
  }
}
