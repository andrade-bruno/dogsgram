import ResetPasswordForm from "@/components/login/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Password Reset",
  description: "Reset your password",
};

type Props = {
  searchParams: Record<string, unknown>;
};

export default async function Page({ searchParams }: Props) {
  return (
    <div className="animeLeft">
      <h1 className="title">Reset Password</h1>
      <ResetPasswordForm searchParams={searchParams} />
    </div>
  );
}
