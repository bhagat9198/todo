import { Task } from '../data/tasks'
import { CATEGORIES, PRIORITIES, STATUSES, SORT_OPTIONS } from '../constants/taskConstants'

export type CategoryValue = typeof CATEGORIES[number]['value']
export type PriorityValue = typeof PRIORITIES[number]['value']
export type StatusValue = typeof STATUSES[number]['value']
export type SortValue = typeof SORT_OPTIONS[number]['value']

export interface TaskFilters {
  searchQuery: string
  category: CategoryValue
  priority: PriorityValue
  status: StatusValue
  sortBy: SortValue
}

export interface TaskStatus {
  label: string
  color: string
}

export interface UseTaskFiltersResult {
  filteredTasks: Task[]
  filters: TaskFilters
  setSearchQuery: (query: string) => void
  setCategory: (category: CategoryValue) => void
  setPriority: (priority: PriorityValue) => void
  setStatus: (status: StatusValue) => void
  setSortBy: (sort: SortValue) => void
}