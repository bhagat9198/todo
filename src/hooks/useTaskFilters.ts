import { useState, useMemo } from 'react'
import { Task } from '../data/tasks'
import { TaskFilters, UseTaskFiltersResult } from '../types/task'
import { PRIORITY_WEIGHTS } from '../constants/taskConstants'

const initialFilters: TaskFilters = {
  searchQuery: '',
  category: 'all',
  priority: 'all',
  status: 'all',
  sortBy: 'dueDate-desc'
}

export const useTaskFilters = (tasks: Task[]): UseTaskFiltersResult => {
  const [filters, setFilters] = useState<TaskFilters>(initialFilters)

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
        const matchesCategory = filters.category === 'all' || task.category === filters.category
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority
        const isOverdue = new Date(task.dueDate) < new Date() && !task.completed
        const isPending = !task.completed && !isOverdue
        
        const matchesStatus = filters.status === 'all' 
          || (filters.status === 'completed' && task.completed)
          || (filters.status === 'pending' && isPending)
          || (filters.status === 'overdue' && isOverdue)

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'dueDate-asc':
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          case 'dueDate-desc':
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
          case 'priority-desc':
            return (PRIORITY_WEIGHTS[b.priority] || 0) - (PRIORITY_WEIGHTS[a.priority] || 0)
          case 'priority-asc':
            return (PRIORITY_WEIGHTS[a.priority] || 0) - (PRIORITY_WEIGHTS[b.priority] || 0)
          default:
            return 0
        }
      })
  }, [tasks, filters])

  return {
    filteredTasks,
    filters,
    setSearchQuery: (query) => setFilters(prev => ({ ...prev, searchQuery: query })),
    setCategory: (category) => setFilters(prev => ({ ...prev, category })),
    setPriority: (priority) => setFilters(prev => ({ ...prev, priority })),
    setStatus: (status) => setFilters(prev => ({ ...prev, status })),
    setSortBy: (sortBy) => setFilters(prev => ({ ...prev, sortBy }))
  }
}