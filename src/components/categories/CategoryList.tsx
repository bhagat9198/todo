import React from 'react'
import { motion } from 'framer-motion'
import { Task } from '../../data/tasks'
import { Category } from '../../types/category'
import { ChevronRight } from 'lucide-react'
import { Droppable } from '@hello-pangea/dnd'

interface CategoryListProps {
  categories: Category[]
  tasks: Task[]
  selectedCategory: string | null
  onSelectCategory: (id: string | null) => void
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  tasks,
  selectedCategory,
  onSelectCategory
}) => {
  const getTasksForCategory = (categoryId: string) => {
    return tasks.filter(task => task.category === categoryId)
  }

  return (
    <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl">
      {categories.map((category, index) => {
        const categoryTasks = getTasksForCategory(category.id)
        const completedTasks = categoryTasks.filter(task => task.completed).length
        const Icon = category.icon.icon
        
        return (
          <Droppable 
            key={category.id} 
            droppableId={`category-${category.id}`}
            type="TASK"
          >
            {(provided, snapshot) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
                onClick={() => onSelectCategory(category.id)}
                className={`
                  w-full flex items-center gap-4 p-4 border-b last:border-b-0
                  border-border-light dark:border-border-dark
                  transition-all duration-200 group cursor-pointer
                  ${selectedCategory === category.id 
                    ? 'bg-primary/5 dark:bg-primary/10' 
                    : 'hover:bg-background-accent/50 dark:hover:bg-dark-primary/50'
                  }
                  ${snapshot.isDraggingOver ? 'bg-primary/10 dark:bg-primary/20' : ''}
                `}
              >
                <div 
                  className={`
                    ${category.color.size} rounded-full flex items-center justify-center
                    ${category.color.bg} bg-opacity-100
                  `}
                >
                  <Icon className={`w-5 h-5 text-white`} />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-text-secondary-light">
                    {completedTasks}/{categoryTasks.length} tasks
                  </p>
                </div>

                <ChevronRight className={`
                  w-5 h-5 transition-all
                  ${selectedCategory === category.id 
                    ? 'text-primary' 
                    : 'text-text-secondary-light group-hover:text-primary'
                  }
                `} />
                {provided.placeholder}
              </motion.div>
            )}
          </Droppable>
        )
      })}
    </div>
  )
}