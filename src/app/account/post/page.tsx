import PhotoPostForm from "@/components/account/photo-post";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Dogs | Post Photo",
};

export default async function PostarPage() {
  return <PhotoPostForm />;
}
