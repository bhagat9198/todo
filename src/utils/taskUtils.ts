import { Task } from '../data/tasks'
import { TaskStatus } from '../types/task'

export const getTaskStatus = (task: Task): TaskStatus => {
  if (task.completed) {
    return { 
      label: 'Completed', 
      color: 'text-status-success'
    }
  }
  
  if (new Date(task.dueDate) < new Date()) {
    return { 
      label: 'Overdue', 
      color: 'text-status-error'
    }
  }
  
  return { 
    label: 'Pending', 
    color: 'text-status-warning'
  }
}

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'text-status-error'
    case 'medium':
      return 'text-status-warning'
    default:
      return 'text-status-success'
  }
}