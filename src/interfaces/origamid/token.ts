import { IOrigamidError } from "./error";

export type ValidateTokenData = {
  code: string;
  data: {
    status: number;
  };
};

export type ValidateTokenResponse = IOrigamidError | ValidateTokenData;
