import { twMerge } from 'tailwind-merge'

import { Spinner } from '@/components/spinner'
import { ButtonProps, Button as ShadcnButton } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icon } from '@/types/icon'
import { icons } from '@/utils/icons'

interface Props extends ButtonProps {
  children: React.ReactNode
  icon?: Icon
  isLoading?: boolean
  tooltipContent?: string
}

const Button = ({
  children,
  icon,
  className,
  isLoading = false,
  tooltipContent,
  ...rest
}: Props) => {
  const buttonContent = (
    <ShadcnButton
      disabled={isLoading}
      className={twMerge(
        'flex items-center justify-center gap-3 rounded-[8px]',
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <div className="flex w-full items-center justify-center gap-3">
          <Spinner className="text-zinc-50" />
          Carregando...
        </div>
      ) : (
        <div className="flex w-full items-center justify-center gap-1">
          {icon && icons[icon]}
          {children}
        </div>
      )}
    </ShadcnButton>
  )

  return tooltipContent ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent className="bg-zinc-800 text-zinc-50">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    buttonContent
  )
}

export { Button }
