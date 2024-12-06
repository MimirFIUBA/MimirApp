import { BellIcon } from "@radix-ui/react-icons";
import AlertCard from "@/components/messages/alert-card";
import { Input } from "@/components/ui/input"
import { Search } from "@mui/icons-material";
import PageHeader from "@/components/page-header";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-6">
        <PageHeader
            className="mb-6"
            icon={<BellIcon width={24} height={24}></BellIcon>}
            title="Alertas">
        </PageHeader>
        {children}
      </div>
    </div>
  );
}