import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import { HomeIcon, RocketIcon, BellIcon } from "@radix-ui/react-icons"
import { Grass, Sensors, Hub } from '@mui/icons-material';
   
// Menu items.
const items = [
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
    title: "Alertas",
    url: "/alerts",
    icon: BellIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      {/* <SidebarHeader /> */}
      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      </SidebarContent>
      {/* <SidebarFooter /> */}
    </Sidebar>
  )
}