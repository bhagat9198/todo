import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, BookOpen, Briefcase, Heart, GraduationCap, ShoppingCart, Users, CircleDot } from 'lucide-react'
import { Select } from '../ui/Select'

const CATEGORIES = [
  { value: 'all', label: 'All Categories', icon: Filter },
  { value: 'Personal', label: 'Personal', icon: BookOpen },
  { value: 'Work', label: 'Work', icon: Briefcase },
  { value: 'Health', label: 'Health', icon: Heart },
  { value: 'Learning', label: 'Learning', icon: GraduationCap },
  { value: 'Shopping', label: 'Shopping', icon: ShoppingCart },
  { value: 'Family', label: 'Family', icon: Users }
]

const PRIORITIES = [
  { value: 'all', label: 'All Priorities', color: 'bg-text-secondary-light' },
  { value: 'low', label: 'Low Priority', color: 'bg-status-success' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-status-warning' },
  { value: 'high', label: 'High Priority', color: 'bg-status-error' }
]

const STATUSES = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' }
]

const SORT_OPTIONS = [
  { value: 'dueDate-asc', label: 'Due Date (Earliest)' },
  { value: 'dueDate-desc', label: 'Due Date (Latest)' },
  { value: 'priority-desc', label: 'Priority (Highest)' },
  { value: 'priority-asc', label: 'Priority (Lowest)' }
]

interface TaskHistoryFiltersProps {
  searchQuery: string
  selectedCategory: string
  selectedPriority: string
  selectedStatus: string
  sortBy: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onPriorityChange: (priority: string) => void
  onStatusChange: (status: string) => void
  onSortChange: (sort: string) => void
}

export const TaskHistoryFilters: React.FC<TaskHistoryFiltersProps> = ({
  searchQuery,
  selectedCategory,
  selectedPriority,
  selectedStatus,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onPriorityChange,
  onStatusChange,
  onSortChange
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6 mb-8"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={onSortChange}
            options={SORT_OPTIONS.map(option => ({
              value: option.value,
              label: (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{option.label}</span>
                </div>
              )
            }))}
            className="w-48"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
            options={CATEGORIES.map(category => ({
              value: category.value,
              label: (
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </div>
              )
            }))}
            className="w-40"
          />

          <Select
            value={selectedPriority}
            onValueChange={onPriorityChange}
            options={PRIORITIES.map(priority => ({
              value: priority.value,
              label: (
                <div className="flex items-center gap-2">
                  <CircleDot className={`w-3 h-3 ${priority.color}`} />
                  <span>{priority.label}</span>
                </div>
              )
            }))}
            className="w-40"
          />

          <Select
            value={selectedStatus}
            onValueChange={onStatusChange}
            options={STATUSES.map(status => ({
              value: status.value,
              label: status.label
            }))}
            className="w-40"
          />
        </div>
      </div>
    </motion.div>
  )
}