import photoGet from "@/actions/photo-get";
import PhotoContent from "@/components/photo/photo-content";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const { data } = await photoGet(params.id);

  if (!data) return { title: "Photo Not Found" };
  return {
    title: data.photo.title,
  };
}

export default async function Page({ params }: Params) {
  const { data } = await photoGet(params.id);

  if (!data) return notFound();

  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  );
}
