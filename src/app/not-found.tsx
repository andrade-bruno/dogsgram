import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dogs | Not Found",
};

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Page not found</h1>
      <Link
        className="button"
        style={{ marginBottom: "1rem", display: "inline-block" }}
        href={"/"}
      >
        Go to home
      </Link>
    </section>
  );
}
