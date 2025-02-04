export type IFormState = {
  ok: boolean;
  data?: Record<string, string> | Array<Record<string, string>>;
  error?: string;
};
