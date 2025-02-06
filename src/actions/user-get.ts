"use server";

import { cookies } from "next/headers";
import OrigamidApi from "@/services/origamid-api";
import { IFormState } from "@/interfaces/form";
import { User } from "@/interfaces/origamid/user";
import { grabAPIError } from "@/utils/grab-api-error";
import { defaults } from "@/utils/constants";

export default async function userGet(): Promise<IFormState<User>> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    const response = await OrigamidApi.USER_GET(token);
    const output = await response.json();

    await grabAPIError(response, output);

    return { data: output as User, ok: true };
  } catch {
    return {
      ok: false,
    };
  }
}
