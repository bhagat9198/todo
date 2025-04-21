import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  format, parseISO, isSameDay, addDays, subDays, startOfWeek, endOfWeek, 
  differenceInMinutes, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameMonth, addWeeks, subWeeks, isWithinInterval,
  startOfDay, endOfDay
} from 'date-fns'
import { 
  X, ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  CheckCircle2, AlertCircle, Clock, Filter, ChevronDown
} from 'lucide-react'
import { useTaskStore } from '../../store/taskStore'
import { Task } from '../../data/tasks'
import { Select } from '../ui/Select'

const VIEW_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' }
]

const HOUR_HEIGHT = 60 // pixels per hour
const TASK_COLORS = {
  completed: 'bg-status-success/20 border-status-success hover:bg-status-success/30',
  overdue: 'bg-status-error/20 border-status-error hover:bg-status-error/30',
  pending: 'bg-status-warning/20 border-status-warning hover:bg-status-warning/30'
}

interface FullScreenCalendarProps {
  isOpen: boolean
  onClose: () => void
  initialDate?: Date
  selectedCategory?: string
  selectedPriority?: string
  selectedStatus?: string
}

export const FullScreenCalendar: React.FC<FullScreenCalendarProps> = ({ 
  isOpen, 
  onClose,
  initialDate = new Date(),
  selectedCategory = 'all',
  selectedPriority = 'all',
  selectedStatus = 'all'
}) => {
  const tasks = useTaskStore(state => state.tasks)
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [filter, setFilter] = useState('all')
  const [expandedDays, setExpandedDays] = useState<string[]>([])

  const navigateToToday = () => {
    setCurrentDate(new Date())
  }

  const navigatePrevious = () => {
    switch (view) {
      case 'day':
        setCurrentDate(subDays(currentDate, 1))
        break
      case 'week':
        setCurrentDate(subWeeks(currentDate, 1))
        break
      case 'month':
        setCurrentDate(subMonths(currentDate, 1))
        break
    }
  }

  const navigateNext = () => {
    switch (view) {
      case 'day':
        setCurrentDate(addDays(currentDate, 1))
        break
      case 'week':
        setCurrentDate(addWeeks(currentDate, 1))
        break
      case 'month':
        setCurrentDate(addMonths(currentDate, 1))
        break
    }
  }

  const getTaskStatus = (task: Task) => {
    if (task.completed) return 'completed'
    if (new Date(task.dueDate) < new Date()) return 'overdue'
    return 'pending'
  }

  const getTasksForInterval = (start: Date, end: Date) => {
    return tasks.filter(task => {
      const taskStart = parseISO(task.startDate)
      const taskEnd = parseISO(task.dueDate)
      const isWithinTimeRange = isWithinInterval(taskStart, { start, end }) || 
                               isWithinInterval(taskEnd, { start, end }) ||
                               (taskStart <= start && taskEnd >= end)

      const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
      const isOverdue = new Date(task.dueDate) < new Date() && !task.completed
      const isPending = !task.completed && !isOverdue
      
      const matchesStatus = selectedStatus === 'all' 
        || (selectedStatus === 'completed' && task.completed)
        || (selectedStatus === 'pending' && isPending)
        || (selectedStatus === 'overdue' && isOverdue)

      return isWithinTimeRange && matchesCategory && matchesPriority && matchesStatus
    })
  }

  const getTaskPosition = (task: Task, dayStart: Date) => {
    const startTime = parseISO(task.startDate)
    const endTime = parseISO(task.dueDate)
    const dayEndTime = endOfDay(dayStart)
    
    const effectiveStartTime = startTime < dayStart ? dayStart : startTime
    const effectiveEndTime = endTime > dayEndTime ? dayEndTime : endTime
    
    const top = effectiveStartTime.getHours() * HOUR_HEIGHT + 
                (effectiveStartTime.getMinutes() / 60) * HOUR_HEIGHT
    const height = Math.max(
      30,
      (differenceInMinutes(effectiveEndTime, effectiveStartTime) / 60) * HOUR_HEIGHT
    )
    
    return { top, height }
  }

  const toggleDayExpansion = (dayKey: string) => {
    setExpandedDays(prev => 
      prev.includes(dayKey) 
        ? prev.filter(d => d !== dayKey)
        : [...prev, dayKey]
    )
  }

  const renderTimeGrid = () => {
    return (
      <div className="relative border-l border-border-light dark:border-border-dark">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div 
            key={hour}
            className="border-b border-border-light dark:border-border-dark relative"
            style={{ height: HOUR_HEIGHT }}
          >
            <span className="absolute -left-16 text-sm text-text-secondary-light">
              {format(new Date().setHours(hour), 'HH:mm')}
            </span>
            <div className="absolute inset-0 bg-background-accent/5 dark:bg-dark-primary/5" />
          </div>
        ))}
      </div>
    )
  }

  const renderTasksForDay = (date: Date) => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)
    const dayTasks = getTasksForInterval(dayStart, dayEnd)
    
    return dayTasks.map((task, index) => {
      const { top, height } = getTaskPosition(task, dayStart)
      const status = getTaskStatus(task)
      const startTime = parseISO(task.startDate)
      const endTime = parseISO(task.dueDate)
      const isMultiDay = !isSameDay(startTime, endTime)
      
      return (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            absolute left-1 right-1 rounded-lg border cursor-pointer
            transition-all duration-200 ${TASK_COLORS[status]}
            ${height > 60 ? 'p-3' : 'p-2'}
          `}
          style={{ top: `${top}px`, height: `${height}px`, zIndex: isMultiDay ? 10 : 1 }}
        >
          <div className="flex items-start gap-2 h-full">
            <div className="flex-shrink-0 mt-0.5">
              {status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4 text-status-success" />
              ) : status === 'overdue' ? (
                <AlertCircle className="w-4 h-4 text-status-error" />
              ) : (
                <Clock className="w-4 h-4 text-status-warning" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium truncate">{task.title}</h4>
              <p className="text-xs text-text-secondary-light">
                {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
                {isMultiDay && ` (${format(startTime, 'MMM d')} - ${format(endTime, 'MMM d')})`}
              </p>
              {height > 80 && task.subtasks.length > 0 && (
                <div className="mt-2 space-y-1">
                  {task.subtasks.map(subtask => (
                    <div 
                      key={subtask.id}
                      className="flex items-center gap-1 text-xs"
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
        </motion.div>
      )
    })
  }

  const renderDayView = () => {
    return (
      <div className="relative" style={{ height: `${24 * HOUR_HEIGHT}px` }}>
        {renderTimeGrid()}
        {renderTasksForDay(currentDate)}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const weekEnd = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map(day => (
          <div key={day.toString()} className="relative">
            <div className={`
              text-sm font-medium mb-2 text-center p-2 rounded-lg
              ${isSameDay(day, new Date()) ? 'bg-primary text-white' : ''}
            `}>
              {format(day, 'EEE d')}
            </div>
            <div className="relative" style={{ height: `${24 * HOUR_HEIGHT}px` }}>
              {renderTimeGrid()}
              {renderTasksForDay(day)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm font-medium text-center p-2">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dayKey = day.toISOString()
          const dayTasks = getTasksForInterval(startOfDay(day), endOfDay(day))
          const isExpanded = expandedDays.includes(dayKey)
          const hasMoreTasks = dayTasks.length > 3
          const displayTasks = isExpanded ? dayTasks : dayTasks.slice(0, 3)
          
          return (
            <div 
              key={day.toString()}
              className={`
                relative p-2 border border-border-light dark:border-border-dark rounded-lg
                ${isSameMonth(day, currentDate) ? 'bg-white/40 dark:bg-dark-primary/40' : 'bg-background-accent/20'}
                ${isSameDay(day, new Date()) ? 'ring-2 ring-primary' : ''}
                ${hasMoreTasks ? 'min-h-[120px]' : ''}
              `}
            >
              <div className="text-sm font-medium mb-2 flex items-center justify-between">
                <span>{format(day, 'd')}</span>
                {hasMoreTasks && (
                  <button
                    onClick={() => toggleDayExpansion(dayKey)}
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
                {displayTasks.map(task => {
                  const status = getTaskStatus(task)
                  const startTime = parseISO(task.startDate)
                  const endTime = parseISO(task.dueDate)
                  const isMultiDay = !isSameDay(startTime, endTime)
                  
                  return (
                    <div
                      key={task.id}
                      className={`
                        text-xs p-1 rounded flex items-center gap-1
                        ${TASK_COLORS[status]}
                        ${isMultiDay ? 'border-l-4' : ''}
                      `}
                    >
                      <div className="flex-shrink-0">
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-3 h-3 text-status-success" />
                        ) : status === 'overdue' ? (
                          <AlertCircle className="w-3 h-3 text-status-error" />
                        ) : (
                          <Clock className="w-3 h-3 text-status-warning" />
                        )}
                      </div>
                      <span className="truncate">
                        {task.title}
                        {isMultiDay && ` (${format(startTime, 'MMM d')} - ${format(endTime, 'MMM d')})`}
                      </span>
                    </div>
                  )
                })}
                {!isExpanded && hasMoreTasks && (
                  <button
                    onClick={() => toggleDayExpansion(dayKey)}
                    className="w-full text-center text-xs text-text-secondary-light hover:text-primary py-1"
                  >
                    {dayTasks.length - 3} more tasks
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCurrentTime = () => {
    const now = new Date()
    const top = now.getHours() * HOUR_HEIGHT + (now.getMinutes() / 60) * HOUR_HEIGHT
    
    return (
      <div 
        className="absolute left-0 right-0 border-t-2 border-primary z-20"
        style={{ top: `${top}px` }}
      >
        <div className="absolute -left-3 -top-1.5 w-3 h-3 rounded-full bg-primary" />
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="flex-1 bg-white dark:bg-dark-background flex flex-col min-h-0"
          >
            {/* Header */}
            <div className="border-b border-border-light dark:border-border-dark p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                    <h2 className="text-h3 font-heading">Calendar View</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={navigatePrevious}
                      className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={navigateToToday}
                      className="px-3 py-1.5 text-sm font-medium hover:bg-background-accent/50 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={navigateNext}
                      className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium ml-2">
                      {format(currentDate, 'MMMM yyyy')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    value={view}
                    onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}
                    options={VIEW_OPTIONS.map(opt => ({
                      value: opt.value,
                      label: opt.label
                    }))}
                    className="w-32"
                  />
                  
                  {/* <Select
                    value={filter}
                    onValueChange={setFilter}
                    options={[
                      { value: 'all', label: 'All Tasks' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'overdue', label: 'Overdue' }
                    ]}
                    className="w-40"
                  /> */}

                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-auto min-h-0">
              <div className="max-w-7xl mx-auto p-4">
                <div className="pl-16 relative">
                  {view === 'day' && renderDayView()}
                  {view === 'week' && renderWeekView()}
                  {view === 'month' && renderMonthView()}
                  {(view === 'day' || view === 'week') && renderCurrentTime()}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}