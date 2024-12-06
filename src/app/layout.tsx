import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WebSocketProvider } from "@/hooks/websocket-provider";
import AppFooter from "@/components/app-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimir",
  description: "Web application for hydroponic crop monitoring.",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
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
        <WebSocketProvider url="ws://localhost:8080/ws">
          <Toaster></Toaster>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <main className="w-full">
                <Header/>
                <div className="flex flex-col overflow-hidden min-h-screen bg-white dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900">
                  {children}
                </div>
                <AppFooter></AppFooter>
              </main>
            </SidebarProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}
