import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
import { icons } from '@/utils/icons'

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
  const Icons = icons()

  return (
    <Form {...form}>
      <div className="w-full space-y-8">
        <FormField
          control={form.control}
          name={fields.name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{fields.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      disabled={fields.disabled}
                      className={cn(
                        'w-full rounded-[8px] bg-zinc-50 dark:bg-zinc-700 border-none shadow pl-3 text-left font-normal flex justify-center items-center gap-2',
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
                      {Icons.calendar}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto rounded-[8px] bg-zinc-800 p-0 text-[--primary-foreground]"
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
