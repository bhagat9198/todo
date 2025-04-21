import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Task } from '../data/tasks'

interface TaskStore {
  tasks: Task[]
  taskOrder: Record<string, string[]>
  initialized: boolean
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  toggleSubtask: (taskId: string, subtaskId: string) => void
  reorderTasks: (categoryId: string, taskIds: string[]) => void
  initializeTasks: (tasks: Task[]) => void
  loading: boolean
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    (set, get) => ({
      tasks: [],
      taskOrder: {},
      initialized: false,
      loading: false,

      initializeTasks: (tasks) => {
        const { initialized } = get()
        if (!initialized) {
          set({ tasks: [...tasks], initialized: true }, false, 'tasks/initialize')
        }
      },

      addTask: (task) => set(
        (state) => ({ tasks: [...state.tasks, task] }),
        false,
        'tasks/add'
      ),

      updateTask: (task) => set(
        (state) => ({
          tasks: state.tasks.map(t => t.id === task.id ? task : t)
        }),
        false,
        'tasks/update'
      ),

      deleteTask: (id) => set(
        (state) => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }),
        false,
        'tasks/delete'
      ),

      toggleTask: (id) => set(
        (state) => ({
          tasks: state.tasks.map(task =>
            task.id === id 
              ? { 
                  ...task, 
                  completed: !task.completed,
                  subtasks: task.subtasks.map(st => ({
                    ...st,
                    completed: !task.completed
                  }))
                } 
              : task
          )
        }),
        false,
        'tasks/toggle'
      ),

      toggleSubtask: (taskId, subtaskId) => set(
        (state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map(st =>
                    st.id === subtaskId
                      ? { ...st, completed: !st.completed }
                      : st
                  ),
                  completed: task.subtasks.every(st => 
                    st.id === subtaskId ? !st.completed : st.completed
                  )
                }
              : task
          )
        }),
        false,
        'tasks/toggleSubtask'
      ),

      reorderTasks: (categoryId, taskIds) => set(
        (state) => ({
          taskOrder: {
            ...state.taskOrder,
            [categoryId]: taskIds
          }
        }),
        false,
        'tasks/reorder'
      )
    }),
    { name: 'task-store' }
  )
)