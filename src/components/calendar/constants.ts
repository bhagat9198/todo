import { Filter, BookOpen, Briefcase, Heart, GraduationCap, ShoppingCart, Users } from 'lucide-react'
import { ViewOption, CategoryOption, PriorityOption, StatusOption } from './types'

export const HOUR_HEIGHT = 60 // pixels per hour
export const MIN_TASK_HEIGHT = 25 // minimum height for tasks

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const VIEW_OPTIONS: ViewOption[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' }
]

export const CATEGORIES: CategoryOption[] = [
  { value: 'all', label: 'All Categories', icon: Filter },
  { value: 'Personal', label: 'Personal', icon: BookOpen },
  { value: 'Work', label: 'Work', icon: Briefcase },
  { value: 'Health', label: 'Health', icon: Heart },
  { value: 'Learning', label: 'Learning', icon: GraduationCap },
  { value: 'Shopping', label: 'Shopping', icon: ShoppingCart },
  { value: 'Family', label: 'Family', icon: Users }
]

export const PRIORITIES: PriorityOption[] = [
  { value: 'all', label: 'All Priorities', color: 'bg-text-secondary-light' },
  { value: 'low', label: 'Low Priority', color: 'bg-status-success' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-status-warning' },
  { value: 'high', label: 'High Priority', color: 'bg-status-error' }
]

export const STATUSES: StatusOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' }
]

export const TASK_COLORS = {
  completed: 'bg-status-success/20 border-status-success hover:bg-status-success/30',
  overdue: 'bg-status-error/20 border-status-error hover:bg-status-error/30',
  pending: 'bg-status-warning/20 border-status-warning hover:bg-status-warning/30'
}