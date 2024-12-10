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
import { Icon } from '@/types/icon'
import { icons } from '@/utils/icons'

type Option = {
  value: any
  label: string
}

type FormFields<T extends FieldValues> = {
  name: Path<T>
  label: string
  icon: Icon
  placeholder: string
  options: Option[]
  disabled?: boolean
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  fields: FormFields<T>
}

const FormSelect = <T extends FieldValues>({ form, fields }: Props<T>) => {
  const options = fields.options || []

  return (
    <Form {...form}>
      <div className="w-full space-y-8">
        <FormField
          control={form.control}
          name={fields.name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{fields.label}</FormLabel>
              <div className="relative z-10 flex w-full items-center justify-between gap-3 rounded-[8px] border">
                <div className="ml-2 text-zinc-800 opacity-50">
                  {icons[fields.icon]}
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
                          'w-full justify-between border-transparent',
                          field.value === undefined && 'text-[#718096]',
                        )}
                      >
                        {field.value !== undefined
                          ? typeof field.value === 'object'
                            ? options.find(
                                (item) =>
                                  item.value?.product?.id ===
                                    field.value?.product?.id &&
                                  item.value?.item === field.value?.item,
                              )?.label || 'Seleção inválida'
                            : options.find((item) => item.value === field.value)
                                ?.label || 'Seleção inválida'
                          : fields.placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full bg-zinc-50 p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Buscar..." className="h-9" />
                      <CommandEmpty>Não encontrado.</CommandEmpty>
                      <CommandGroup>
                        <CommandList className="w-full" id="select-options">
                          {options.map((item) => (
                            <CommandItem
                              className="cursor-pointer hover:bg-zinc-50/90"
                              value={String(item.value)}
                              key={String(item.value)}
                              onSelect={() => {
                                form.setValue(
                                  fields.name,
                                  item.value as PathValue<T, Path<T>>,
                                )
                              }}
                              aria-selected={item.value === field.value}
                            >
                              {item.label}
                              <Check
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  item.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
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
