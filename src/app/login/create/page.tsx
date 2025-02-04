import CreateUserForm from "@/components/login/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Create Account",
  description: "Create your Dogs social media account",
};

export default async function Page() {
  return (
    <div className="animeLeft">
      <h1 className="title">Create</h1>
      <CreateUserForm />
    </div>
  );
}
