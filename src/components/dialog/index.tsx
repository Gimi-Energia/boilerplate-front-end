import { BaseSyntheticEvent } from 'react'

import { DialogContentProps } from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as ShadcnDialog,
} from '@/components/ui/dialog'

interface Props extends DialogContentProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  onSubmit?: (event: BaseSyntheticEvent) => void
  title: string
  description?: string
  isLoading?: boolean
}

const Dialog = ({
  isOpen,
  onClose,
  children,
  onSubmit,
  title,
  description,
  className,
  isLoading = false,
}: Props) => {
  const handleConfirmClick = (e: BaseSyntheticEvent) => {
    if (onSubmit) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <ShadcnDialog open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleConfirmClick} role="dialog">
        <DialogContent
          className={twMerge(
            'max-h-full overflow-y-auto bg-zinc-50 text-zinc-800 sm:max-w-[425px]',
            className,
          )}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="flex w-full flex-col gap-3">{children}</div>
          {onSubmit && (
            <DialogFooter>
              <Button isLoading={isLoading} onClick={handleConfirmClick}>
                Confirmar
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </ShadcnDialog>
  )
}

export { Dialog }
