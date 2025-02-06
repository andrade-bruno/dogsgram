"use server";

import { IFormState } from "@/interfaces/form";
import { Comment } from "@/interfaces/origamid/photo";
import OrigamidApi from "@/services/origamid-api";
import { defaults } from "@/utils/constants";
import { grabAPIError } from "@/utils/grab-api-error";
import { handleActionError } from "@/utils/handle-action-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function commentPost(
  _state: IFormState,
  formData: FormData
): Promise<IFormState<Comment>> {
  const token = cookies().get("token")?.value;
  const comment = formData.get("comment") as string | null;
  const photoId = formData.get("id") as string | null;

  try {
    if (!comment || !photoId) throw new Error("Fill all the fields");
    if (!token) throw new Error(defaults.UNAUTHENTICATED);

    const response = await OrigamidApi.COMMENT_POST(
      photoId,
      { comment, id: photoId },
      token
    );
    const output = (await response.json()) as Comment;

    await grabAPIError(response, output);

    revalidateTag("comment");
    revalidateTag("photos");
    revalidateTag("stats");
    return { data: output, ok: true };
  } catch (error: unknown) {
    return handleActionError<Comment>(error);
  }
}
