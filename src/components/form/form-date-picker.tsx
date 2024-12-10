import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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

type FormFields<T extends FieldValues> = {
  name: Path<T>
  label: string
  disabled?: boolean
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  fields: FormFields<T>
}

const FormDatePicker = <T extends FieldValues>({ form, fields }: Props<T>) => {
  return (
    <Form {...form}>
      <div className="w-full space-y-8">
        <FormField
          control={form.control}
          name={fields.name}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>{fields.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      disabled={fields.disabled}
                      className={cn(
                        'w-full rounded-[8px] border-[#e5e7eb] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span className="text-[#718096]">
                          Selecione uma Data
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto rounded-[8px] bg-zinc-800 p-0 text-zinc-50"
                  align="start"
                >
                  <Calendar
                    className="rounded"
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

export { FormDatePicker }
