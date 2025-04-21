import React from 'react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { Calendar, CircleDot, CheckCircle2, AlertCircle } from 'lucide-react'
import { Task } from '../../data/tasks'

interface TaskHistoryListProps {
  tasks: Task[]
}

export const TaskHistoryList: React.FC<TaskHistoryListProps> = ({ tasks }) => {
  const getTaskStatus = (task: Task) => {
    if (task.completed) return { label: 'Completed', color: 'text-status-success' }
    if (new Date(task.dueDate) < new Date()) return { label: 'Overdue', color: 'text-status-error' }
    return { label: 'Pending', color: 'text-status-warning' }
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <AlertCircle className="w-12 h-12 text-text-secondary-light mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-text-secondary-light">
          Try adjusting your filters or search query
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                task.completed 
                  ? 'bg-status-success text-white' 
                  : 'bg-background-accent dark:bg-dark-primary'
              }`}>
                {task.completed && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className={`text-lg font-medium mb-1 ${
                    task.completed ? 'line-through text-text-secondary-light' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                    {task.description}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTaskStatus(task).color}`}>
                  {getTaskStatus(task).label}
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-text-secondary-light">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(parseISO(task.dueDate), 'PPp')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className={`w-3 h-3 ${
                    task.priority === 'high' ? 'text-status-error' :
                    task.priority === 'medium' ? 'text-status-warning' :
                    'text-status-success'
                  }`} />
                  <span className="capitalize">{task.priority} Priority</span>
                </div>
                {task.subtasks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}