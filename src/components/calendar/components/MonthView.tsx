import React from 'react'
import { motion } from 'framer-motion'
import { format, isSameMonth, isSameDay, startOfDay, endOfDay, parseISO } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { Task } from '../../../data/tasks'
import { getTaskStatus } from '../utils'
import { TaskItem } from './TaskItem'
import { TASK_COLORS } from '../constants'

interface MonthViewProps {
  days: Date[]
  currentDate: Date
  tasks: Task[]
  expandedDays: string[]
  onDayExpand: (dayKey: string) => void
  onDateSelect?: (date: Date) => void
}

export const MonthView: React.FC<MonthViewProps> = ({
  days,
  currentDate,
  tasks,
  expandedDays,
  onDayExpand,
  onDateSelect
}) => {
  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => {
      const taskStart = parseISO(task.startDate)
      const taskEnd = parseISO(task.dueDate)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)
      
      return (taskStart <= dayEnd && taskEnd >= dayStart)
    })
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-sm font-medium text-center p-2">
          {day}
        </div>
      ))}
      {days.map(day => {
        const dayKey = day.toISOString()
        const dayTasks = getTasksForDay(day)
        const isExpanded = expandedDays.includes(dayKey)
        const hasMoreTasks = dayTasks.length > 3
        const displayTasks = isExpanded ? dayTasks : dayTasks.slice(0, 3)
        
        return (
          <motion.div 
            key={day.toString()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onDateSelect?.(day)}
            className={`
              relative p-2 border border-border-light dark:border-border-dark rounded-lg
              ${isSameMonth(day, currentDate) ? 'bg-white/40 dark:bg-dark-primary/40' : 'bg-background-accent/20'}
              ${isSameDay(day, new Date()) ? 'ring-2 ring-primary' : ''}
              ${hasMoreTasks ? 'min-h-[120px]' : ''}
              cursor-pointer hover:shadow-md transition-all
            `}
          >
            <div className="text-sm font-medium mb-2 flex items-center justify-between">
              <span>{format(day, 'd')}</span>
              {hasMoreTasks && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDayExpand(dayKey)
                  }}
                  className="p-1 hover:bg-background-accent/50 rounded-full transition-colors"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
            <div className={`
              space-y-1 
              ${hasMoreTasks && !isExpanded ? 'max-h-[120px]' : ''}
              ${hasMoreTasks && isExpanded ? 'max-h-[300px] overflow-y-auto' : ''}
            `}>
              {displayTasks.map(task => (
                <div
                  key={task.id}
                  className={`
                    rounded-lg border cursor-pointer
                    ${TASK_COLORS[getTaskStatus(task)]}
                  `}
                >
                  <TaskItem
                    task={task}
                    height={40}
                    isMultiDay={true}
                    compact={true}
                  />
                </div>
              ))}
              {!isExpanded && hasMoreTasks && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDayExpand(dayKey)
                  }}
                  className="w-full text-center text-xs text-text-secondary-light hover:text-primary py-1"
                >
                  {dayTasks.length - 3} more tasks
                </button>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}