import photoGet from "@/actions/photo-get";
import PhotoModal from "@/components/photo/photo-modal";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const { data } = await photoGet(params.id);
  if (!data) return { title: "Dogs | Not Found" };

  return {
    title: data.photo.title,
  };
}

export default async function Page({ params }: Params) {
  const { data } = await photoGet(params.id);
  if (!data) return notFound();

  return <PhotoModal photo={data} />;
}
