import React, { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Task } from '../../data/tasks'
import { Checkbox } from '../ui/Checkbox'
import { TaskMetadata } from './TaskMetadata'
import { SubtaskList } from './SubtaskList'
import { useTaskStore } from '../../store/taskStore'

interface TaskItemProps {
  task: Task
  onInfoClick?: (task: Task) => void
  compact?: boolean
}

const TaskItemComponent: React.FC<TaskItemProps> = ({ 
  task,
  onInfoClick,
  compact = false
}) => {
  const navigate = useNavigate()
  const toggleTask = useTaskStore(state => state.toggleTask)
  const handleToggle = useCallback(() => toggleTask(task.id), [task.id, toggleTask])
  const handleInfoClick = useCallback(() => {
    if (onInfoClick) {
      onInfoClick(task)
    } else {
      navigate(`/task/${task.id}`)
    }
  }, [task, onInfoClick, navigate])

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggle}
          size="sm"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-medium truncate ${
            task.completed ? 'line-through text-text-secondary-light' : ''
          }`}>
            {task.title}
          </span>
        </div>
        <button
          onClick={handleInfoClick}
          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-background-accent/50 rounded-lg transition-all"
          aria-label={`View details for "${task.title}"`}
        >
          <Info className="w-4 h-4 text-primary" />
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`group rounded-xl border relative overflow-hidden ${
        task.completed 
          ? 'border-border-light/50 dark:border-border-dark/50 bg-white/50 dark:bg-dark-primary/50' 
          : 'border-border-light dark:border-border-dark bg-white dark:bg-dark-primary'
      } hover:shadow-lg transition-all duration-300`}
    >
      <div className="relative p-4">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggle}
              aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-body-large font-medium truncate ${
                task.completed 
                  ? 'line-through text-text-secondary-light dark:text-text-secondary-dark' 
                  : 'text-text-primary-light dark:text-text-primary-dark'
              }`}>
                {task.title}
              </span>
              <button
                onClick={handleInfoClick}
                className="p-2 hover:bg-background-accent/50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                aria-label={`View details for "${task.title}"`}
              >
                <Info className="w-4 h-4 text-primary" />
              </button>
            </div>

            <TaskMetadata task={task} />
            <SubtaskList subtasks={task.subtasks} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const TaskItem = memo(TaskItemComponent)