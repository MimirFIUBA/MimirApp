import PageHeader from "@/components/page-header";
import { LibraryBooks } from "@mui/icons-material";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-6">
            <PageHeader
                icon={
                    <LibraryBooks/>
                }
                title="Documentación"
            >
            </PageHeader>
          {children}
        </div>
      </div>
    );
  }