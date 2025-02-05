"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  cookies().delete("token");

  /*
    Does not hard refresh page
    We must use window API instead
    Or reset every context manually
  */
  // redirect("/login");
}
