"use server";

import { IFormState } from "@/interfaces/form";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { grabAPIError } from "@/utils/grab-api-error";
import { handleActionError } from "@/utils/handle-action-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function photoDelete(id: string): Promise<IFormState> {
  const token = cookies().get("token")?.value;
  try {
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    const response = await OrigamidApi.PHOTO_DELETE(id, token);
    const output = await response.json();

    await grabAPIError(response, output);
  } catch (error: unknown) {
    return handleActionError(error);
  }

  revalidateTag("photos");
  revalidateTag("stats");
  redirect("/account");
}
