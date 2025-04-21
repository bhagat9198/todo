import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useTaskStore } from '../../store/taskStore'

export const OverdueCard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const overdueTasks = tasks.filter(task => 
    !task.completed && new Date(task.dueDate) < new Date()
  ).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card backdrop-blur-md bg-white/80 dark:bg-dark-card/80 p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-red/20 to-accent-yellow/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-red/10 to-accent-yellow/5 rounded-full blur-xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-accent-red" />
            <h2 className="text-h3 font-heading">Overdue</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-h4 font-bold text-accent-red mb-1"
            >
              {overdueTasks} tasks
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-body-small text-text-secondary-light dark:text-text-secondary-dark"
            >
              Need attention
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-accent-red/10 to-accent-yellow/10 text-accent-red rounded-lg text-body-small font-medium hover:shadow-lg transition-all duration-300"
          >
            Review Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}