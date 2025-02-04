import LostPasswordForm from "@/components/login/lost-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Password Lost",
  description: "Did you lost your password?",
};

export default async function Page() {
  return (
    <div className="animeLeft">
      <h1 className="title">Lost Password</h1>
      <LostPasswordForm />
    </div>
  );
}
