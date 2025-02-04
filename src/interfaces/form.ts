export type IFormState<
  T = Record<string, unknown> | Array<Record<string, unknown>>
> = {
  ok: boolean;
  data?: T;
  error?: string;
};
