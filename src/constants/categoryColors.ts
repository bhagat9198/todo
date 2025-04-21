export const CATEGORY_COLORS = [
  { name: 'blue', bg: 'bg-primary', text: 'text-primary', size: 'h-12 w-12' },
  { name: 'purple', bg: 'bg-accent-purple', text: 'text-accent-purple', size: 'h-12 w-12' },
  { name: 'pink', bg: 'bg-accent-pink', text: 'text-accent-pink', size: 'h-12 w-12' },
  { name: 'red', bg: 'bg-accent-red', text: 'text-accent-red', size: 'h-12 w-12' },
  { name: 'orange', bg: 'bg-accent-yellow', text: 'text-accent-yellow', size: 'h-12 w-12' },
  { name: 'green', bg: 'bg-status-success', text: 'text-status-success', size: 'h-12 w-12' },
  { name: 'indigo', bg: 'bg-indigo-500', text: 'text-indigo-500', size: 'h-12 w-12' },
  { name: 'teal', bg: 'bg-teal-500', text: 'text-teal-500', size: 'h-12 w-12' },
  { name: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-500', size: 'h-12 w-12' },
  { name: 'rose', bg: 'bg-rose-500', text: 'text-rose-500', size: 'h-12 w-12' },
  { name: 'amber', bg: 'bg-amber-500', text: 'text-amber-500', size: 'h-12 w-12' },
  { name: 'lime', bg: 'bg-lime-500', text: 'text-lime-500', size: 'h-12 w-12' }
] as const

export const CATEGORY_COLOR_SQUARES = [
  { name: 'blue', bg: 'bg-primary', text: 'text-primary', size: 'h-6 w-6' },
  { name: 'purple', bg: 'bg-accent-purple', text: 'text-accent-purple', size: 'h-6 w-6' },
  { name: 'pink', bg: 'bg-accent-pink', text: 'text-accent-pink', size: 'h-6 w-6' },
  { name: 'red', bg: 'bg-accent-red', text: 'text-accent-red', size: 'h-6 w-6' },
  { name: 'orange', bg: 'bg-accent-yellow', text: 'text-accent-yellow', size: 'h-6 w-6' },
  { name: 'green', bg: 'bg-status-success', text: 'text-status-success', size: 'h-6 w-6' },
  { name: 'indigo', bg: 'bg-indigo-500', text: 'text-indigo-500', size: 'h-6 w-6' },
  { name: 'teal', bg: 'bg-teal-500', text: 'text-teal-500', size: 'h-6 w-6' },
  { name: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-500', size: 'h-6 w-6' },
  { name: 'rose', bg: 'bg-rose-500', text: 'text-rose-500', size: 'h-6 w-6' },
  { name: 'amber', bg: 'bg-amber-500', text: 'text-amber-500', size: 'h-6 w-6' },
  { name: 'lime', bg: 'bg-lime-500', text: 'text-lime-500', size: 'h-6 w-6' }
] as const

export type CategoryColor = typeof CATEGORY_COLORS[number]