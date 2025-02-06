import statsGet from "@/actions/stats-get";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("@/components/account/stats-graph"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Dogs | Statistics",
};

export default async function Page() {
  const { data } = await statsGet();

  if (!data)
    return (
      <section>
        <p>No stats yet</p>
      </section>
    );

  return (
    <section>
      <DynamicComponent stats={data} />
    </section>
  );
}
