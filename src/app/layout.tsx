import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/utils/fonts";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { UserContextProvider } from "@/context/user";
import userGet from "@/actions/user-get";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Social media for Dogs",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <section>{modal}</section>
            <Footer />
          </div>
        </UserContextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
