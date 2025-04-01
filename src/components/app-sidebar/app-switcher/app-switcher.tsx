'use client'

import Link from 'next/link'
import { parseCookies } from 'nookies'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useUserStore } from '@/stores/user-store'
import { getNameInitials, icons } from '@/utils'

const AppSwitcher = () => {
  const { tempToken } = parseCookies()

  const { isMobile } = useSidebar()

  const Icons = icons()

  const { user } = useUserStore()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded hover:bg-[--primary-600]/90 transition duration-200 hover:text-[--primary-foreground]/90"
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[--primary-600]/90"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                {getNameInitials('Portal da ISO')}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Portal da ISO</span>
              </div>
              {Icons.chevronsUpDown}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded bg-[--primary-foreground] shadow border-none"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Apps
            </DropdownMenuLabel>
            {user?.cards.map((app) => (
              <Link
                key={app.card.id}
                href={
                  `${app.card.link}/?temp=${tempToken}` ||
                  'https://gimix.vercel.app/'
                }
              >
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer rounded transition duration-200 hover:backdrop-brightness-90">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {getNameInitials(app.card.name)}
                  </div>
                  {app.card.name}
                </DropdownMenuItem>
              </Link>
            ))}
            <Link href="https://gimix.vercel.app/">
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer rounded transition duration-200 hover:backdrop-brightness-90">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {Icons.arrowLeft}
                </div>
                GIMIx
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { AppSwitcher }
