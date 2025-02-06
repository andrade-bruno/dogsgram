import photosGet from "@/actions/photos-get";
import Feed from "@/components/feed/feed";

export default async function Page({ params }: { params: { user: string } }) {
  const { data } = await photosGet({ user: params.user });

  if (!data) return null;

  return (
    <section className="container mainSection">
      <h1 className="title">{params.user}'s Photos</h1>
      <Feed photos={data} username={params.user} />
    </section>
  );
}
