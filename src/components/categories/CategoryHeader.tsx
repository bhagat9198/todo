import React from 'react'
import { motion } from 'framer-motion'
import { FolderPlus, Filter, Grid, List } from 'lucide-react'
import { useCategoryStore } from '../../store/categoryStore'
import { CategoryModal } from './CategoryModal'

export const CategoryHeader: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [view, setView] = React.useState<'grid' | 'list'>('grid')

  return (
    <>
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl font-heading font-bold">Categories</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Organize and manage your task categories
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-background-accent/50'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-background-accent/50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <FolderPlus className="w-5 h-5" />
            <span>New Category</span>
          </motion.button>
        </div>
      </div>

      <CategoryModal 
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}