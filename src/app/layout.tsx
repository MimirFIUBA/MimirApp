import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="flex p-4 pl-8 bg-primary min-h-16 items-center shadow-lg z-40">
            <h1 className="text-white text-xl font-bold ">MIMIR</h1>
          </div>
          <div className="flex flex-row items-stretch grow">
            {children}
          </div>
          <div className="p-2">Footer</div>
        </div>
      </body>
    </html>
  );
}
