import { Filter, BookOpen, Briefcase, Heart, GraduationCap, ShoppingCart, Users, Clock } from 'lucide-react'

export const CATEGORIES = [
  { value: 'all', label: 'All Categories', icon: Filter },
  { value: 'Personal', label: 'Personal', icon: BookOpen },
  { value: 'Work', label: 'Work', icon: Briefcase },
  { value: 'Health', label: 'Health', icon: Heart },
  { value: 'Learning', label: 'Learning', icon: GraduationCap },
  { value: 'Shopping', label: 'Shopping', icon: ShoppingCart },
  { value: 'Family', label: 'Family', icon: Users }
] as const

export const PRIORITIES = [
  { value: 'all', label: 'All Priorities', color: 'bg-text-secondary-light' },
  { value: 'low', label: 'Low Priority', color: 'bg-status-success' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-status-warning' },
  { value: 'high', label: 'High Priority', color: 'bg-status-error' }
] as const

export const STATUSES = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' }
] as const

export const SORT_OPTIONS = [
  { value: 'dueDate-asc', label: 'Due Date (Earliest)', icon: Clock },
  { value: 'dueDate-desc', label: 'Due Date (Latest)', icon: Clock },
  { value: 'priority-desc', label: 'Priority (Highest)', icon: Clock },
  { value: 'priority-asc', label: 'Priority (Lowest)', icon: Clock }
] as const

export const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1
} as const