import { IFormState } from "@/interfaces/form";
import { defaults } from "./constants";

export function handleActionError<T>(error: unknown): IFormState<T> {
  let message = defaults.GENERIC_ERROR;
  if (error instanceof Error) message = error.message;

  return {
    ok: false,
    error: message,
  };
}
