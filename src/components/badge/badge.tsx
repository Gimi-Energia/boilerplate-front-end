import { Badge as ShadcnBagde } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  className?: string
}

const Badge = ({ label, className }: Props) => {
  return (
    <ShadcnBagde
      className={cn(
        'w-fit max-w-full px-2 py-0.5 bg-[--primary-100] text-[--primary-700] rounded-full text-nowrap truncate',
        className,
      )}
    >
      {label}
    </ShadcnBagde>
  )
}

export { Badge }
