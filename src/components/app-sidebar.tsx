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

import { HomeIcon, DragHandleDots2Icon, GlobeIcon, Share1Icon, RocketIcon, BellIcon } from "@radix-ui/react-icons"
   
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
    icon: DragHandleDots2Icon,
  },
  {
    title: "Nodos",
    url: "/nodes",
    icon: Share1Icon,
  },
  {
    title: "Sensores",
    url: "/topics",
    icon: GlobeIcon,
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