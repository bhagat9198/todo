import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CategoryList } from '../components/categories/CategoryList'
import { CategoryHeader } from '../components/categories/CategoryHeader'
import { CategoryTasks } from '../components/categories/CategoryTasks'
import { useTaskStore } from '../store/taskStore'
import { useCategoryStore } from '../store/categoryStore'

export const CategoryManagement: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks)
  const categories = useCategoryStore(state => state.categories)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background-accent to-background-light dark:from-dark-background dark:via-dark-primary/20 dark:to-dark-background">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <CategoryHeader />
        
        <div className="grid grid-cols-12 gap-8">
          {/* Category List */}
          <div className="col-span-4">
            <CategoryList 
              categories={categories}
              tasks={tasks}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          {/* Tasks */}
          <div className="col-span-8">
            <CategoryTasks 
              selectedCategory={categories.find(c => c.id === selectedCategory)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}