import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: React.ReactNode }[]
  placeholder?: string
  className?: string
}

export const Select = ({ value, onValueChange, options, placeholder, className = '' }: SelectProps) => {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={`inline-flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm bg-white/50 dark:bg-dark-primary/50 border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-white/80 dark:hover:bg-dark-primary/80 transition-colors w-[200px] ${className}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption ? (
            <div className="flex items-center gap-2 truncate">
              {selectedOption.label}
            </div>
          ) : (
            <div className="text-text-secondary-light dark:text-text-secondary-dark truncate">
              {placeholder}
            </div>
          )}
        </div>
        <SelectPrimitive.Icon className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-text-secondary-light" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-50 w-[200px] max-h-[300px] overflow-hidden bg-white dark:bg-dark-card rounded-lg shadow-lg border border-border-light dark:border-border-dark"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex items-center px-3 py-2 text-sm rounded-md cursor-default hover:bg-primary/5 focus:bg-primary/5 outline-none select-none data-[highlighted]:bg-primary/5 data-[state=checked]:text-primary data-[state=checked]:font-medium"
              >
                <SelectPrimitive.ItemText>
                  <div className="flex items-center gap-2 truncate pr-6">
                    {option.label}
                  </div>
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}