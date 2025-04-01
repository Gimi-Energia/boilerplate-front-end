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
import { Skeleton } from '@/components/ui/skeleton'

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
            'flex flex-col h-auto max-h-[90vh] bg-zinc-200 dark:bg-zinc-800 text-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 sm:max-w-[425px]',
            className,
          )}
        >
          {isLoading ? (
            <div className="flex justify-between items-center gap-2">
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex w-full flex-col gap-2">{children}</div>
          </div>

          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            onSubmit && (
              <DialogFooter className="flex-shrink-0">
                <Button
                  className="bg-red-500 text-zinc-50 hover:bg-red-500/90 hover:text-zinc-50"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]"
                  isLoading={isLoading}
                  onClick={handleConfirmClick}
                >
                  Confirmar
                </Button>
              </DialogFooter>
            )
          )}
        </DialogContent>
      </form>
    </ShadcnDialog>
  )
}

export { Dialog }
