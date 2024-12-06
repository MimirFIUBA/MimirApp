import PageHeader from "@/components/page-header";
import { TableIcon } from "@radix-ui/react-icons";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-6">
            <PageHeader
                icon={
                    <TableIcon width={24} height={24}/>
                }
                title="Variables de Usuario"
                subtitle="Aprendé a manejar las variables de usuario"
            >
            </PageHeader>
          {children}
        </div>
      </div>
    );
  }