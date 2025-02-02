import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/app/functions/fonts";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Social media for Dogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>{children}</body>
    </html>
  );
}
