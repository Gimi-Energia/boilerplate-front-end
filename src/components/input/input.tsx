/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, InputHTMLAttributes } from 'react'

import InputMask from '@mona-health/react-input-mask'
import { twMerge } from 'tailwind-merge'

import { Input as ShadcnInput } from '@/components/ui/input'
import { Icon } from '@/types/icon'
import { icons } from '@/utils/icons'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: Icon
  children?: React.ReactNode
  mask?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ icon, children, mask, className, type, onChange, ...rest }, ref) => {
    const Icons = icons()

    const baseClassName = twMerge(
      'flex h-9 w-full rounded border border-transparent bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder-zinc-400 dark:placeholder-zinc-500',
      className,
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value

      if (type === 'number') {
        value = value.replace(/\D/g, '')
      }

      onChange?.({
        ...event,
        target: {
          ...event.target,
          value: type === 'number' ? Number(value) || 0 : value,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        if (['e', 'E', '-', '+'].includes(event.key)) {
          event.preventDefault()
        }
      }
    }

    const inputProps = {
      ref,
      className: baseClassName,
      ...rest,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
    }

    return (
      <div className="flex w-full items-center justify-between gap-1 border-none">
        <div className="flex w-full items-center gap-2 rounded shadow bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50">
          <div className="pl-2 opacity-50">{Icons[icon]}</div>
          {mask ? (
            <InputMask mask={mask} {...inputProps} />
          ) : (
            <ShadcnInput {...inputProps} type={type} />
          )}
        </div>
        {children && children}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
