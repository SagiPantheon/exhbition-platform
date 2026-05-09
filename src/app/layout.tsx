import type { Metadata } from "next";
import "./globals.css";
import FloatingShellNav from "../components/FloatingShellNav";
import LiveShellStatus from "../components/LiveShellStatus";

export const metadata: Metadata = {
  title: "Exhibition Platform",
  description: "Exhibition Asset Configuration Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><LiveShellStatus />
        <FloatingShellNav />
        {children}</body>
    </html>
  );
}