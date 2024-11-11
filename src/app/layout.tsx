import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="flex p-4 pl-8 bg-gradient-to-l from-primary-dark to-primary min-h-16 items-center shadow z-40">
            <h1 className="text-primary-foreground text-xl font-bold ">MIMIR</h1>
          </div>
          <div className="flex flex-row items-stretch grow ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
