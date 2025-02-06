import AccountHeader from "@/components/account/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <AccountHeader />
      {children}
    </div>
  );
}
