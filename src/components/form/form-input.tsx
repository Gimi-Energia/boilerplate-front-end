/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Input } from '@/components/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icon } from '@/types/icon'
import { icons } from '@/utils/icons'

type FormFields<T extends FieldValues> = {
  name: Path<T>
  label: string
  icon: Icon
  isCurrency?: boolean
  prefix?: string
  mask?: string
  children?: ReactNode
  description?: string
} & InputHTMLAttributes<HTMLInputElement>

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  fields: FormFields<T>
}

const Icons = icons()

const CustomInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const baseClassName =
    'flex h-9 w-full rounded border border-transparent bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="flex w-full items-center justify-between gap-1 border-none">
      <div className="flex w-full items-center gap-2 rounded shadow">
        <div className="pl-2 opacity-50">{Icons.banknote}</div>
        <input
          ref={ref}
          className={`${baseClassName} ${className || ''}`}
          {...props}
        />
      </div>
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

const FormInput = <T extends FieldValues>({ form, fields }: Props<T>) => {
  const renderInput = (field: any) => {
    return (
      <Input
        id={fields.name}
        icon={fields.icon}
        placeholder={fields.placeholder}
        aria-label={fields.label}
        type={fields.type}
        mask={fields.mask}
        disabled={fields.disabled}
        value={field.value || ''}
        onChange={(e) => field.onChange(e.target.value)}
      >
        {fields.children}
      </Input>
    )
  }

  return (
    <Form {...form}>
      <div className="w-full space-y-8">
        <FormField
          control={form.control}
          name={fields.name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor={fields.name}>{fields.label}</FormLabel>
              <FormControl>{renderInput(field)}</FormControl>
              {fields.description && (
                <FormDescription>{fields.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

export { FormInput }
