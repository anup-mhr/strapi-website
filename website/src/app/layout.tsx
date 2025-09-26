import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import { NavigationTracker } from "@/components/common/NavigationTracker";

const geistDosis = Dosis({
  variable: "--font-geist-dosis",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aku Zeliang",
  description:
    "Creative portfolio showcasing design work across multiple disciplines",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistDosis.variable} antialiased`}>
        <NavigationTracker />
        {children}
      </body>
    </html>
  );
}
