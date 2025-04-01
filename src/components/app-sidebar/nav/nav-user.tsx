'use client'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserStore } from '@/stores/user-store'
import { getNameInitials, icons } from '@/utils'

const NavUserSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded w-full">
          <Skeleton className="h-8 w-8 rounded" />
          <div className="flex flex-col flex-1 gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const NavUser = () => {
  const { isMobile } = useSidebar()
  const Icons = icons()
  const { user, clearUser } = useUserStore()
  const router = useRouter()
  if (!user) {
    return <NavUserSkeleton />
  }

  const handleLogout = () => {
    clearUser()
    router.push('https://gimix.vercel.app/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded transition duration-200 hover:bg-[--primary-600]/90 hover:text-[--primary-foreground]/90"
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[--primary-600]/90"
            >
              <Avatar className="h-8 w-8 rounded shadow bg-zinc-600">
                <AvatarImage
                  src={user.picture || ''}
                  alt={`${user.name} avatar`}
                />
                <AvatarFallback className="rounded text-zinc-600">
                  {getNameInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              {Icons.chevronsUpDown}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded bg-[--primary-foreground] shadow border-none"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded">
                  <AvatarImage
                    src={user.picture || ''}
                    alt={`${user.name} avatar`}
                  />
                  <AvatarFallback className="rounded">
                    {getNameInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded transition duration-200 hover:backdrop-brightness-90">
              {Icons.file}
              Manual de usuário
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded transition duration-200 hover:backdrop-brightness-90">
              {Icons.circleHelp}
              Suporte
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer rounded transition duration-200 hover:backdrop-brightness-90"
              onClick={handleLogout}
            >
              {Icons.logOut}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { NavUser }
