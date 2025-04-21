import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  size?: 'sm' | 'md'
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  }

  return (
    <div className="relative">
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`
          ${sizeClasses[size]}
          rounded-md
          border-2
          transition-all
          duration-200
          outline-none
          focus:ring-2
          focus:ring-primary/20
          ${checked 
            ? 'bg-primary border-primary dark:bg-primary dark:border-primary' 
            : 'border-border-light dark:border-border-dark bg-white dark:bg-dark-primary'
          }
        `}
      >
        {checked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <Check className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          </motion.div>
        )}
      </button>
    </div>
  )
}