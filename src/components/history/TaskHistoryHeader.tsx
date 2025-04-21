import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, LayoutList } from 'lucide-react'

interface TaskHistoryHeaderProps {
  view: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
}

export const TaskHistoryHeader: React.FC<TaskHistoryHeaderProps> = ({ view, onViewChange }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold"
        >
          Task History
        </motion.h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'list' 
                ? 'bg-primary text-white' 
                : 'hover:bg-background-accent/50'
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewChange('calendar')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'calendar' 
                ? 'bg-primary text-white' 
                : 'hover:bg-background-accent/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-text-secondary-light dark:text-text-secondary-dark"
      >
        View and manage all your tasks in one place
      </motion.p>
    </div>
  )
}