import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { Spinner } from '@/components/spinner'
import { Button as ShadcnButton } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { Icon } from '@/types/icon'
import { icons } from '@/utils/icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
  icon?: Icon
  tooltipContent?: string
  className?: string
  children: React.ReactNode
}

const ButtonContent = ({
  isLoading,
  icon,
  children,
}: Pick<ButtonProps, 'isLoading' | 'icon' | 'children'>) => {
  const Icons = icons()

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center gap-3">
        <Spinner />
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center gap-1">
      {icon && Icons[icon as keyof typeof Icons]}
      {children}
    </div>
  )
}

const ButtonWithTooltip = ({
  tooltipContent,
  children,
}: Pick<ButtonProps, 'tooltipContent' | 'children'>) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{children}</span>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const buttonVariants = {
  default:
    'bg-sky-500 text-zinc-50 rounded transition duration-200 hover:bg-sky-500/90',
  outline:
    'border border-sky-500 bg-zinc-50 text-sky-500 rounded shadow transition duration-200 hover:bg-sky-200 hover:text-sky-500',
  ghost:
    'rounded transition duration-200 hover:bg-accent hover:text-accent-foreground',
  link: 'rounded text-primary underline-offset-4 transition duration-200 hover:underline',
  destructive:
    'bg-red-500 text-zinc-50 rounded transition duration-200 hover:bg-red-500/90',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      isLoading = false,
      icon,
      tooltipContent,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const buttonContent = (
      <ShadcnButton
        variant={variant}
        size={size}
        className={twMerge(buttonVariants[variant], className)}
        ref={ref}
        disabled={isLoading}
        {...rest}
      >
        <ButtonContent isLoading={isLoading} icon={icon}>
          {children}
        </ButtonContent>
      </ShadcnButton>
    )

    return tooltipContent ? (
      <ButtonWithTooltip tooltipContent={tooltipContent}>
        {buttonContent}
      </ButtonWithTooltip>
    ) : (
      buttonContent
    )
  },
)

Button.displayName = 'Button'

export { Button }
