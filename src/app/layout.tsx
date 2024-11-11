import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimir",
  description: "Web application for hydroponic crop monitoring.",
  icons: [{ rel: "icon", url: "icon.svg" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <div className="flex flex-row items-stretch grow bg-white dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
