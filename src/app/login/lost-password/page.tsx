import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogs | Password Lost",
  description: "Did you lost your password?",
};

export default async function Page() {
  return (
    <main>
      <h1>Lost Password</h1>
    </main>
  );
}
