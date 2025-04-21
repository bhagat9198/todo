import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTaskStore } from '../../store/taskStore'
import { TaskModal } from '../TaskModal'
import { Task } from '../../data/tasks'
import { TaskHeader } from '../task/TaskHeader'
import { TaskItem } from '../task/TaskItem'

export const TaskCard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const completedTasks = tasks.filter(task => task.completed).length
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card backdrop-blur-md bg-white/80 dark:bg-dark-card/80 p-6"
      >
        <TaskHeader completedTasks={completedTasks} totalTasks={tasks.length} />
        
        <div className="space-y-4">
          <AnimatePresence>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onInfoClick={setSelectedTask}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <TaskModal 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />
    </>
  )
}