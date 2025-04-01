/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, ChevronsUpDown } from 'lucide-react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IOption } from '@/types'
import { Icon } from '@/types/icon'
import { icons } from '@/utils'

type FormFields<T extends FieldValues> = {
  name: Path<T>
  label: string
  icon: Icon
  placeholder: string
  options: IOption[]
  disabled?: boolean
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  fields: FormFields<T>
}

const FormSelect = <T extends FieldValues>({ form, fields }: Props<T>) => {
  const options = fields.options || []

  const Icons = icons()

  const getCurrentValue = (fieldValue: any) => {
    if (fieldValue === undefined) return undefined

    // Convert to string for comparison if the value is a number
    const normalizedFieldValue =
      typeof fieldValue === 'number' ? String(fieldValue) : fieldValue

    return (
      options.find((item) => {
        const normalizedItemValue =
          typeof item.value === 'number' ? String(item.value) : item.value
        return normalizedItemValue === normalizedFieldValue
      })?.label || 'Seleção inválida'
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
              <FormLabel>{fields.label}</FormLabel>
              <div className="relative bg-zinc-50 dark:bg-zinc-700 z-10 flex w-full items-center justify-between gap-2 rounded-[8px] shadow">
                <div className="ml-2 text-zinc-800 dark:text-zinc-50 opacity-50">
                  {Icons[fields.icon]}
                </div>
                <Popover>
                  <PopoverTrigger disabled={fields.disabled} asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="select-options"
                        className={cn(
                          'w-full justify-between border-transparent bg-zinc-50 dark:bg-zinc-700',
                          field.value === undefined && 'text-[#718096]',
                        )}
                      >
                        {getCurrentValue(field.value) || fields.placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Buscar..." className="h-9" />
                      <CommandEmpty>Não encontrado.</CommandEmpty>
                      <CommandGroup>
                        <CommandList className="w-full" id="select-options">
                          {options.map((item) => {
                            const isSelected =
                              typeof field.value === 'number'
                                ? String(item.value) === String(field.value)
                                : item.value === field.value

                            return (
                              <CommandItem
                                className="cursor-pointer transition duration-200 hover:bg-[--primary-foreground]/90"
                                value={String(item.value)}
                                key={String(item.value)}
                                onSelect={() => {
                                  form.setValue(
                                    fields.name,
                                    item.value as PathValue<T, Path<T>>,
                                  )
                                }}
                                aria-selected={isSelected}
                              >
                                {item.label}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    isSelected ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            )
                          })}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

export { FormSelect }
