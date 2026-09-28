import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "monis.rent — Workspace Builder",
  description:
    "Configure your rental workspace: desk, chair, monitor, lamp and plant. Live preview + rental summary.",
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
