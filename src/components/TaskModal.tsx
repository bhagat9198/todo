import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, FolderIcon, Paperclip, CheckSquare, MessageSquare, Link2 } from 'lucide-react'
import { Task } from '../data/tasks'
import { useTaskStore } from '../store/taskStore'
import { Checkbox } from './ui/Checkbox'

interface TaskModalProps {
  task: Task | null
  onClose: () => void
}

const TaskModalComponent: React.FC<TaskModalProps> = ({ task, onClose }) => {
  if (!task) return null

  const completedSubtasks = task.subtasks.filter(st => st.completed).length
  const toggleSubtask = useTaskStore(state => state.toggleSubtask)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-2xl shadow-xl m-4"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border-light dark:border-border-dark">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-h3 font-heading mb-2">{task.title}</h2>
                <div className="flex items-center gap-4 text-text-secondary-light">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Due {new Date(task.dueDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FolderIcon className="w-4 h-4" />
                    <span>{task.category}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-background-accent/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background-accent/30 dark:bg-dark-primary/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="w-5 h-5 text-primary" />
                  <span className="font-medium">Progress</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {completedSubtasks}/{task.subtasks.length}
                </p>
              </div>
              <div className="bg-background-accent/30 dark:bg-dark-primary/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Comments</span>
                </div>
                <p className="text-2xl font-bold text-secondary">3</p>
              </div>
              <div className="bg-background-accent/30 dark:bg-dark-primary/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Paperclip className="w-5 h-5 text-accent-purple" />
                  <span className="font-medium">Attachments</span>
                </div>
                <p className="text-2xl font-bold text-accent-purple">{task.attachments}</p>
              </div>
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div>
                <h3 className="text-h4 font-heading mb-4">Subtasks</h3>
                <div className="space-y-3">
                  {task.subtasks.map(subtask => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-accent/30 dark:hover:bg-dark-primary/30 transition-colors"
                    >
                      <Checkbox
                        checked={subtask.completed}
                        onChange={() => toggleSubtask(task.id, subtask.id)}
                        size="sm"
                      />
                      <span className={subtask.completed ? 'line-through text-text-secondary-light' : ''}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links & Resources */}
            <div>
              <h3 className="text-h4 font-heading mb-4">Links & Resources</h3>
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-text-secondary-light" />
                <a href="#" className="text-primary hover:underline">workout-plan.pdf</a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border-light dark:border-border-dark bg-background-accent/30 dark:bg-dark-primary/30 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors">
                Delete Task
              </button>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-border-light dark:border-border-dark hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const TaskModal = memo(TaskModalComponent)