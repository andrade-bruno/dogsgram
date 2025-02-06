"use server";

import { cookies } from "next/headers";
import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { User } from "@/interfaces/origamid/user";
import { grabAPIError } from "@/utils/grab-api-error";

export default async function userGet(): Promise<IFormState<User>> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token not found.");

    const response = await OrigamidApi.USER_GET(token);
    const output = await response.json();

    await grabAPIError(response, output);

    return { data: output as User, ok: true };
  } catch (error: unknown) {
    return {
      ok: false,
    };
  }
}
