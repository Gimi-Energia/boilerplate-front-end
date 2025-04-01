'use client'

import { AppSwitcher } from '@/components/app-sidebar/app-switcher'
import { NavMain, NavUser } from '@/components/app-sidebar/nav'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-[--primary] text-[--primary-foreground]">
        <AppSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-[--primary] text-[--primary-foreground]">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="bg-[--primary] text-[--primary-foreground]">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar }
