import React from 'react'
import { motion } from 'framer-motion'
import { format, parseISO, isSameDay } from 'date-fns'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { Task } from '../../../data/tasks'
import { getTaskStatus } from '../utils'
import { TASK_COLORS } from '../constants'

interface TaskItemProps {
  task: Task
  height: number
  isMultiDay?: boolean
  compact?: boolean
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  height, 
  isMultiDay = false,
  compact = false 
}) => {
  const status = getTaskStatus(task)
  const startTime = parseISO(task.startDate)
  const endTime = parseISO(task.dueDate)
  
  return (
    <div className={`
      flex items-start gap-2 h-full
      ${height > 60 ? 'p-3' : 'p-2'}
    `}>
      <div className="flex-shrink-0 mt-0.5">
        {status === 'completed' ? (
          <CheckCircle2 className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-status-success`} />
        ) : status === 'overdue' ? (
          <AlertCircle className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-status-error`} />
        ) : (
          <Clock className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-status-warning`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className={`
          font-medium truncate
          ${compact ? 'text-xs' : 'text-sm'}
        `}>
          {task.title}
        </h4>
        {height > 25 && (
          <p className="text-xs text-text-secondary-light truncate">
            {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
            {isMultiDay && ` (${format(startTime, 'MMM d')} - ${format(endTime, 'MMM d')})`}
          </p>
        )}
        {height > 80 && task.subtasks.length > 0 && (
          <div className="mt-2 space-y-1">
            {task.subtasks.map(subtask => (
              <div 
                key={subtask.id}
                className="flex items-center gap-1 text-xs truncate"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  subtask.completed ? 'bg-status-success' :
                  subtask.priority === 'high' ? 'bg-status-error' :
                  'bg-status-warning'
                }`} />
                <span className={subtask.completed ? 'line-through' : ''}>
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}