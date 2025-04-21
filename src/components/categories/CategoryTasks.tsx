import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Task } from '../../data/tasks'
import { Category } from '../../types/category'
import { Plus, AlertCircle, GripVertical } from 'lucide-react'
import { TaskItem } from '../task/TaskItem'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useTaskStore } from '../../store/taskStore'

interface CategoryTasksProps {
  selectedCategory: Category | undefined
}

export const CategoryTasks: React.FC<CategoryTasksProps> = ({
  selectedCategory
}) => {
  const navigate = useNavigate()
  const tasks = useTaskStore(state => state.tasks)
  const taskOrder = useTaskStore(state => state.taskOrder)
  const reorderTasks = useTaskStore(state => state.reorderTasks)
  
  // Filter tasks for the selected category
  const categoryTasks = React.useMemo(() => {
    if (!selectedCategory) return []
    return tasks.filter(task => task.category === selectedCategory.id)
  }, [tasks, selectedCategory])

  // Get ordered tasks based on taskOrder or fall back to category order
  const orderedTasks = React.useMemo(() => {
    if (!selectedCategory) return []
    
    const categoryOrder = taskOrder[selectedCategory.id]
    if (!categoryOrder) return categoryTasks

    const orderedTasks = [...categoryTasks]
    orderedTasks.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.id)
      const indexB = categoryOrder.indexOf(b.id)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })

    return orderedTasks
  }, [categoryTasks, selectedCategory, taskOrder])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedCategory) return
    if (result.type !== 'TASK') return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (
      sourceIndex === undefined || 
      destinationIndex === undefined || 
      sourceIndex === destinationIndex
    ) {
      return
    }

    try {
      const newTasks = Array.from(orderedTasks)
      const [removed] = newTasks.splice(sourceIndex, 1)
      newTasks.splice(destinationIndex, 0, removed)
      reorderTasks(selectedCategory.id, newTasks.map(task => task.id))
    } catch (error) {
      console.error('Error during drag and drop operation:', error)
    }
  }

  const handleAddTask = () => {
    navigate('/task/new', { 
      state: { 
        category: selectedCategory?.id 
      }
    })
  }

  if (!selectedCategory) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center text-center p-8 bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl"
      >
        <div>
          <AlertCircle className="w-12 h-12 text-text-secondary-light mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Category Selected</h3>
          <p className="text-text-secondary-light">
            Select a category from the list to view its tasks
          </p>
        </div>
      </motion.div>
    )
  }

  const Icon = selectedCategory.icon.icon

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${selectedCategory.color.bg} bg-opacity-10
          `}>
            <Icon className={`w-5 h-5 ${selectedCategory.color.text}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{selectedCategory.name}</h2>
            <p className="text-text-secondary-light">
              {orderedTasks.filter(t => t.completed).length}/{orderedTasks.length} tasks completed
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </motion.button>
      </div>

      <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable 
            droppableId={`tasks-${selectedCategory.id}`}
            type="TASK"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 transition-colors ${
                  snapshot.isDraggingOver ? 'bg-primary/5 rounded-xl p-4' : ''
                }`}
              >
                <AnimatePresence>
                  {orderedTasks.length > 0 ? (
                    orderedTasks.map((task, index) => (
                      <Draggable 
                        key={task.id} 
                        draggableId={task.id} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`
                              flex items-center gap-2
                              group relative rounded-lg overflow-hidden
                              ${snapshot.isDragging ? 'shadow-lg ring-2 ring-primary/50' : ''}
                              ${task.completed ? 'bg-status-success/10' : 'bg-background-accent/30 dark:bg-dark-primary/30'}
                              hover:bg-background-accent/50 dark:hover:bg-dark-primary/50
                              transition-colors
                            `}
                          >
                            {/* Drag Handle */}
                            <div 
                              {...provided.dragHandleProps}
                              className="flex-shrink-0 w-8 h-full flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 transition-all duration-200"
                            >
                              <GripVertical className="w-4 h-4 text-text-secondary-light" />
                            </div>
                            
                            {/* Task Content */}
                            <div className="flex-1 py-2 pr-2">
                              <TaskItem
                                task={task}
                                onInfoClick={() => navigate(`/task/${task.id}`)}
                                compact={true}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <AlertCircle className="w-12 h-12 text-text-secondary-light mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Tasks</h3>
                      <p className="text-text-secondary-light">
                        This category doesn't have any tasks yet
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}