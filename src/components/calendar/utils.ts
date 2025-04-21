import { parseISO, isPast, isWithinInterval, startOfDay, endOfDay, differenceInMinutes } from 'date-fns'
import { Task } from '../../data/tasks'
import { TaskStatus, TaskPosition } from './types'
import { HOUR_HEIGHT, MIN_TASK_HEIGHT } from './constants'

export const getTaskStatus = (task: Task): TaskStatus => {
  if (task.completed) return 'completed'
  if (isPast(parseISO(task.dueDate))) return 'overdue'
  return 'pending'
}

export const getTasksForInterval = (tasks: Task[], start: Date, end: Date, filters: any = {}) => {
  const { category = 'all', priority = 'all', status = 'all' } = filters
  
  return tasks.filter(task => {
    const taskStart = parseISO(task.startStart)
    const taskEnd = parseISO(task.dueDate)
    const isWithinTimeRange = isWithinInterval(taskStart, { start, end }) || 
                             isWithinInterval(taskEnd, { start, end }) ||
                             (taskStart <= start && taskEnd >= end)

    const matchesCategory = category === 'all' || task.category === category
    const matchesPriority = priority === 'all' || task.priority === priority
    const taskStatus = getTaskStatus(task)
    const matchesStatus = status === 'all' || taskStatus === status

    return isWithinTimeRange && matchesCategory && matchesPriority && matchesStatus
  })
}

export const calculateTaskPosition = (task: Task, allTasks: Task[], dayStart: Date): TaskPosition => {
  const taskStart = parseISO(task.startDate)
  const taskEnd = parseISO(task.dueDate)
  const dayEndTime = endOfDay(dayStart)
  
  const effectiveStartTime = taskStart < dayStart ? dayStart : taskStart
  const effectiveEndTime = taskEnd > dayEndTime ? dayEndTime : taskEnd
  
  // Find overlapping tasks
  const overlappingTasks = allTasks.filter(t => {
    if (t.id === task.id) return false
    const tStart = parseISO(t.startDate)
    const tEnd = parseISO(t.dueDate)
    return (tStart <= effectiveEndTime && tEnd >= effectiveStartTime)
  })

  const top = effectiveStartTime.getHours() * HOUR_HEIGHT + 
              (effectiveStartTime.getMinutes() / 60) * HOUR_HEIGHT
  
  const height = Math.max(
    MIN_TASK_HEIGHT,
    (differenceInMinutes(effectiveEndTime, effectiveStartTime) / 60) * HOUR_HEIGHT
  )

  // Calculate width and left offset based on overlapping tasks
  const totalOverlapping = overlappingTasks.length + 1
  const index = overlappingTasks.filter(t => 
    parseISO(t.startDate) < effectiveStartTime || 
    (parseISO(t.startDate).getTime() === effectiveStartTime.getTime() && t.id < task.id)
  ).length

  const width = `${100 / totalOverlapping}%`
  const left = `${(index * 100) / totalOverlapping}%`

  return { top, height, width, left }
}

export const filterTasks = (tasks: Task[], filters: any = {}) => {
  const { category = 'all', priority = 'all', status = 'all' } = filters
  
  return tasks.filter(task => {
    const matchesCategory = category === 'all' || task.category === category
    const matchesPriority = priority === 'all' || task.priority === priority
    const taskStatus = getTaskStatus(task)
    const matchesStatus = status === 'all' || taskStatus === status

    return matchesCategory && matchesPriority && matchesStatus
  })
}