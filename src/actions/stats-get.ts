"use server";

import { IFormState } from "@/interfaces/form";
import { IStat } from "@/interfaces/origamid/stats";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { grabAPIError } from "@/utils/grab-api-error";
import { handleActionError } from "@/utils/handle-action-error";
import { cookies } from "next/headers";

export default async function statsGet(): Promise<IFormState<IStat[]>> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error(defaults.UNAUTHENTICATED);
    const response = await OrigamidApi.STATS_GET(token);

    const output = (await response.json()) as IStat[];

    await grabAPIError(response, output);

    return { data: output, ok: true };
  } catch (error) {
    return handleActionError(error);
  }
}
