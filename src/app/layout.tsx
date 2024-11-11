import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimir",
  description: "Web application for hydroponic crop monitoring.",
  icons: [{ rel: "icon", url: "icon.svg" }]
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
              <Header/>
              <div className="flex flex-row items-stretch grow bg-white dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
