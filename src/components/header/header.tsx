import Link from 'next/link'

import { SidebarTrigger } from '@/components/ui/sidebar'

const Header = () => {
  return (
    <div className="w-full flex items-center bg-[--primary] p-2 text-[--primary-foreground]">
      <SidebarTrigger className="absolute" />
      <div className="w-full text-center">
        <Link href="/">
          <strong>Portal da ISO</strong>
        </Link>
      </div>
    </div>
  )
}

export { Header }
