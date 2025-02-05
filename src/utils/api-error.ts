import { IFormState } from "@/interfaces/form";
import { defaults } from "./constants";

export default function apiError(error: unknown): IFormState {
  let message = defaults.GENERIC_ERROR;
  if (error instanceof Error) message = error.message;

  return {
    ok: false,
    error: message,
  };
}
