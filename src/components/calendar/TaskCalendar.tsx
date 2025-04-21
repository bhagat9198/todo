import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  parseISO,
  startOfDay,
  endOfDay,
  isWithinInterval
} from 'date-fns'
import { useTaskStore } from '../../store/taskStore'
import { Task } from '../../data/tasks'
import { FullScreenCalendar } from './FullScreenCalendar'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface TaskCalendarProps {
  onDateSelect?: (date: Date | null) => void
  selectedDate?: Date | null
  tasks?: Task[]
  isDashboard?: boolean
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ 
  onDateSelect,
  selectedDate: externalSelectedDate,
  tasks: providedTasks,
  isDashboard = false
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | null>(null)
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)
  
  const allTasks = useTaskStore(state => state.tasks)
  const tasks = providedTasks || allTasks
  const selectedDate = externalSelectedDate ?? internalSelectedDate
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(task => {
      const taskStart = startOfDay(parseISO(task.startDate))
      const taskEnd = endOfDay(parseISO(task.dueDate))
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)
      
      return (
        (taskStart <= dayEnd && taskEnd >= dayStart) ||
        isWithinInterval(dayStart, { start: taskStart, end: taskEnd }) ||
        isWithinInterval(dayEnd, { start: taskStart, end: taskEnd })
      )
    })
  }

  const handleDateSelect = (date: Date) => {
    const newSelectedDate = isSameDay(date, selectedDate || new Date()) ? null : date
    if (onDateSelect) {
      onDateSelect(newSelectedDate)
    } else {
      setInternalSelectedDate(newSelectedDate)
    }
    setIsFullScreenOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullScreenOpen(true)}
              className="px-3 py-1 text-sm font-medium hover:bg-background-accent/50 rounded-lg"
            >
              {format(currentDate, 'MMMM yyyy')}
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-text-secondary-light py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {monthDays.map((day, index) => {
            const dayTasks = getTasksForDate(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isCurrentDay = isToday(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            
            return (
              <motion.button
                key={day.toString()}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDateSelect(day)}
                transition={{ delay: index * 0.01 }}
                className={`
                  relative p-2 border border-border-light dark:border-border-dark rounded-lg
                  ${isCurrentMonth ? 'bg-white/40 dark:bg-dark-primary/40' : 'bg-background-accent/20 dark:bg-dark-primary/20'}
                  ${isCurrentDay ? 'ring-2 ring-primary ring-offset-2' : ''}
                  ${isSelected ? 'ring-2 ring-secondary ring-offset-2' : ''}
                  transition-all cursor-pointer group min-h-[60px]
                `}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`
                      text-sm font-medium
                      ${isCurrentMonth ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-secondary-light'}
                    `}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  
                  {dayTasks.length > 0 && (
                    <div className="mt-auto">
                      <div className={`
                        text-xs px-2 py-1 rounded-full text-center font-medium
                        ${dayTasks.every(t => t.completed)
                          ? 'bg-status-success/10 text-status-success' 
                          : 'bg-status-warning/10 text-status-warning'
                        }
                      `}>
                        {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                      </div>
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <FullScreenCalendar 
        isOpen={isFullScreenOpen}
        onClose={() => setIsFullScreenOpen(false)}
        initialDate={selectedDate || currentDate}
      />
    </>
  )
}