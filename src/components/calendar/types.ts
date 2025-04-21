import { Task } from '../../data/tasks'

export type CalendarView = 'day' | 'week' | 'month'

export type TaskStatus = 'completed' | 'overdue' | 'pending'

export interface TaskPosition {
  top: number
  height: number
  width?: string
  left?: string
}

export interface TaskFilter {
  category: string
  priority: string
  status: string
}

export interface ViewOption {
  value: CalendarView
  label: string
}

export interface CategoryOption {
  value: string
  label: string
  icon?: React.ComponentType<any>
}

export interface PriorityOption {
  value: string
  label: string
  color: string
}

export interface StatusOption {
  value: string
  label: string
}

export interface TaskCalendarProps {
  onDateSelect?: (date: Date | null) => void
  selectedDate?: Date | null
  tasks?: Task[]
  filters?: TaskFilter
}

export interface FullScreenCalendarProps {
  isOpen: boolean
  onClose: () => void
  initialDate?: Date
  filters?: TaskFilter
}