import React from 'react'
import { motion } from 'framer-motion'
import { Task } from '../../data/tasks'
import { Category } from '../../types/category'
import { Edit2, Trash2 } from 'lucide-react'
import { CategoryTaskList } from './CategoryTaskList'

interface CategoryCardProps {
  category: Category
  tasks: Task[]
  isSelected: boolean
  onSelect: () => void
  index: number
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  tasks,
  isSelected,
  onSelect,
  index
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const completedTasks = tasks.filter(task => task.completed).length
  
  const Icon = category.icon.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`
        group bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl
        border-2 transition-all duration-200
        ${isSelected ? 'border-primary' : 'border-transparent'}
        hover:border-primary/50
      `}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${category.color.bg} bg-opacity-10
              `}
            >
              <Icon className={`w-5 h-5 ${category.color.text}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-text-secondary-light">
                {completedTasks}/{tasks.length} tasks completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Add edit functionality
              }}
              className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Add delete functionality
              }}
              className="p-2 hover:bg-status-error/10 text-status-error rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedTasks / tasks.length) * 100}%` }}
              className={`h-full ${category.color.bg}`}
            />
          </div>

          <CategoryTaskList 
            tasks={tasks}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </motion.div>
  )
}