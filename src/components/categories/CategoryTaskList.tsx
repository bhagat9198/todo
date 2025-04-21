import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Task } from '../../data/tasks'
import { ChevronDown, CheckCircle2, Clock } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface CategoryTaskListProps {
  tasks: Task[]
  isExpanded: boolean
  onToggleExpand: () => void
}

export const CategoryTaskList: React.FC<CategoryTaskListProps> = ({
  tasks,
  isExpanded,
  onToggleExpand
}) => {
  const displayTasks = isExpanded ? tasks : tasks.slice(0, 3)
  const hasMoreTasks = tasks.length > 3

  console.log("displayTasks :: ", displayTasks)
  
  return (
    <div className="space-y-2">
      {displayTasks.map(task => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            flex items-center gap-3 p-3 rounded-lg
            ${task.completed 
              ? 'bg-status-success/10' 
              : 'bg-background-accent/30 dark:bg-dark-primary/30'
            }
          `}
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center
            ${task.completed 
              ? 'bg-status-success text-white' 
              : 'bg-white dark:bg-dark-primary'
            }
          `}>
            {task.completed && <CheckCircle2 className="w-4 h-4" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`
              text-sm font-medium truncate
              ${task.completed ? 'line-through text-text-secondary-light' : ''}
            `}>
              {task.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary-light">
              <Clock className="w-3 h-3" />
              <span>{format(parseISO(task.dueDate), 'MMM d, h:mm a')}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {hasMoreTasks && (
        <button
          onClick={onToggleExpand}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-text-secondary-light hover:text-primary transition-colors"
        >
          <span>{isExpanded ? 'Show less' : `${tasks.length - 3} more tasks`}</span>
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      )}
    </div>
  )
}