import { Label } from '@/components/ui/label'
import { Switch as SwitchShadcn } from '@/components/ui/switch'

interface Props {
  id: string
  label: string
  onChange: (checked: boolean) => void
  checked?: boolean
  disabled?: boolean
}

export const Switch = ({
  id,
  label,
  onChange,
  checked,
  disabled = false,
}: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <SwitchShadcn
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
