import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { HomeIcon, RocketIcon, BellIcon, ChevronUpIcon, TableIcon } from "@radix-ui/react-icons"
import { Grass, Sensors, Hub, LibraryBooks } from '@mui/icons-material';

const applicationItems = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Cultivos",
    url: "/crops",
    icon: Grass,
  },
  {
    title: "Nodos",
    url: "/nodes",
    icon: Hub,
  },
  {
    title: "Sensores",
    url: "/topics",
    icon: Sensors,
  },
  {
    title: "Triggers",
    url: "/triggers",
    icon: RocketIcon,
  },
  {
    title: "Variables",
    url: "/variables",
    icon: TableIcon,
  },
  {
    title: "Alertas",
    url: "/alerts",
    icon: BellIcon,
  },
]

const docItems = [
  {
    title: "Introducción",
    url: "/docs/intro",
  },
  {
    title: "Cultivos",
    url:"/docs/crops"
  },
  {
    title:"Handlers",
    url:"/docs/handlers"
  },
  {
    title:"Triggers",
    url:"/docs/triggers"
  },
  {
    title:"Variables",
    url:"/docs/variables"
  },
]


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupLabel>Ayuda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <LibraryBooks/>
                        Documentación
                      <ChevronUpIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {
                      docItems.map((item) => (
                        <CollapsibleContent key={item.title}>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton asChild>
                                <a href={item.url}>
                                  <span>{item.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ))
                    }
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}