export default async function Page({ params }: { params: { id: number } }) {
  return (
    <main>
      <h1>Photo ID: {params.id}</h1>
    </main>
  );
}
