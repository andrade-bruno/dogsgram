"use server";

import { IFormState } from "@/interfaces/form";
import {
  ValidateTokenData,
  ValidateTokenResponse,
} from "@/interfaces/origamid/token";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { grabAPIError } from "@/utils/grab-api-error";
import { handleActionError } from "@/utils/handle-action-error";
import { cookies } from "next/headers";

export default async function validateToken(): Promise<
  IFormState<ValidateTokenData>
> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    const response = await OrigamidApi.TOKEN_VALIDATE_POST(token);
    const data = (await response.json()) as ValidateTokenResponse;

    await grabAPIError(response, data);

    return { data, ok: true };
  } catch (error) {
    return handleActionError(error);
  }
}
