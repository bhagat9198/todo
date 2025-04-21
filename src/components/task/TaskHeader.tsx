import React from 'react'
import { Calendar } from 'lucide-react'

interface TaskHeaderProps {
  completedTasks: number
  totalTasks: number
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ completedTasks, totalTasks }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-h3 font-heading">Today's Tasks</h2>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-background-accent/50 dark:bg-dark-card rounded-lg">
        <span className="text-body-small font-medium text-text-secondary-light dark:text-text-secondary-dark">
          {completedTasks}/{totalTasks} completed
        </span>
      </div>
    </div>
  )
}