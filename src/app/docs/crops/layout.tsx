import PageHeader from "@/components/page-header";
import { Grass } from "@mui/icons-material";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-6">
            <PageHeader
                className="mb-6"
                icon={
                    <Grass/>
                }
                title="Cultivos"
                subtitle="Aprende a manejar tus cultivos"
            >
            </PageHeader>
          {children}
        </div>
      </div>
    );
  }