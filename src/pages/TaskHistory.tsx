import React, { useState } from 'react'
import { useTaskStore } from '../store/taskStore'
import { TaskHistoryHeader } from '../components/history/TaskHistoryHeader'
import { TaskHistoryFilters } from '../components/history/TaskHistoryFilters'
import { TaskHistoryList } from '../components/history/TaskHistoryList'
import { TaskCalendar } from '../components/calendar/TaskCalendar'
import { useTaskFilters } from '../hooks/useTaskFilters'

export const TaskHistory: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  const {
    filteredTasks,
    filters,
    setSearchQuery,
    setCategory,
    setPriority,
    setStatus,
    setSortBy
  } = useTaskFilters(tasks)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background-accent to-background-light dark:from-dark-background dark:via-dark-primary/20 dark:to-dark-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <TaskHistoryHeader 
          view={view}
          onViewChange={setView}
        />

        <TaskHistoryFilters
          searchQuery={filters.searchQuery}
          selectedCategory={filters.category}
          selectedPriority={filters.priority}
          selectedStatus={filters.status}
          sortBy={filters.sortBy}
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategory}
          onPriorityChange={setPriority}
          onStatusChange={setStatus}
          onSortChange={setSortBy}
        />

        {view === 'list' ? (
          <TaskHistoryList tasks={filteredTasks} />
        ) : (
          <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6">
            <TaskCalendar 
              onDateSelect={setSelectedDate} 
              selectedDate={selectedDate}
              tasks={filteredTasks}
            />
          </div>
        )}
      </div>
    </div>
  )
}