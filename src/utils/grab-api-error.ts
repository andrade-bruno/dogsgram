import translate from "translate";
import { defaults } from "./constants";

export async function grabAPIError(
  response: Response,
  json: any
): Promise<void> {
  if (!response.ok) {
    const message =
      "message" in json
        ? await translate(json.message, { from: "pt", to: "en" })
        : defaults.GENERIC_ERROR;

    throw new Error(message);
  }
}
