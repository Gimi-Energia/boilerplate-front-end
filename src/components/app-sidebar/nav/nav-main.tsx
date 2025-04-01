'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useDepartmentsQuery } from '@/hooks'
import { useUserStore } from '@/stores/user-store'
import { getNameInitials, icons } from '@/utils'

const NavItemSkeleton = () => {
  return (
    <SidebarMenuItem>
      <div className="flex items-center gap-2 px-2 py-1.5 rounded">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-24" />
      </div>
    </SidebarMenuItem>
  )
}

const NavMain = () => {
  const Icons = icons()
  const router = useRouter()

  const { user } = useUserStore()

  const { departments, isLoading } = useDepartmentsQuery(user)

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-zinc-200">Navegação</SidebarGroupLabel>
      <SidebarMenu>
        <Link href={'/'}>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Início"
              className="rounded transition duration-200 hover:bg-[--primary-600]/90 hover:text-[--primary-foreground]/90"
              onClick={() => router.push('/')}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {Icons.home}
              </div>
              <span>Início</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>

        {isLoading ? (
          <>
            <NavItemSkeleton />
            <NavItemSkeleton />
            <NavItemSkeleton />
          </>
        ) : (
          departments?.map((department) => (
            <Link key={department.id} href={`/instructions/${department.id}`}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={department.name}
                  className="rounded transition duration-200 hover:bg-[--primary-600]/90 hover:text-[--primary-foreground]/90"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {getNameInitials(department.name)}
                  </div>
                  <span>{department.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export { NavMain }
