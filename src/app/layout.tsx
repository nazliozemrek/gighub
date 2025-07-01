import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GigHub",
  description: "Find your next side hustle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
