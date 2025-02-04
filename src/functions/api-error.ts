import { IFormState } from "@/interfaces/form";

export default function apiError(error: unknown): IFormState {
  let message = "Unexpected error";
  if (error instanceof Error) message = error.message;

  return {
    ok: false,
    error: message,
  };
}
