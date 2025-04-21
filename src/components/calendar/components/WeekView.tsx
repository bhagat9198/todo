import React from 'react'
import { format, isSameDay, startOfDay, endOfDay, parseISO } from 'date-fns'
import { Task } from '../../../data/tasks'
import { TimeGrid } from './TimeGrid'
import { CurrentTimeLine } from './CurrentTimeLine'
import { calculateTaskPosition } from '../utils'
import { TASK_COLORS } from '../constants'
import { TaskItem } from './TaskItem'

interface WeekViewProps {
  days: Date[]
  tasks: Task[]
}

export const WeekView: React.FC<WeekViewProps> = ({ days, tasks }) => {
  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => {
      const taskStart = parseISO(task.startDate)
      const taskEnd = parseISO(task.dueDate)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)
      
      return (taskStart <= dayEnd && taskEnd >= dayStart)
    })
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map(day => (
        <div key={day.toString()} className="relative">
          <div className={`
            text-sm font-medium mb-2 text-center p-2 rounded-lg
            ${isSameDay(day, new Date()) ? 'bg-primary text-white' : ''}
          `}>
            {format(day, 'EEE d')}
          </div>
          <div className="relative" style={{ height: `${24 * 60}px` }}>
            <TimeGrid />
            {getTasksForDay(day).map((task, index) => {
              const { top, height, width, left } = calculateTaskPosition(task, getTasksForDay(day), day)
              const startTime = parseISO(task.startDate)
              const endTime = parseISO(task.dueDate)
              const isMultiDay = !isSameDay(startTime, endTime)
              
              return (
                <div
                  key={task.id}
                  className={`
                    absolute rounded-lg border cursor-pointer
                    ${TASK_COLORS[getTaskStatus(task)]}
                  `}
                  style={{ 
                    top: `${top}px`, 
                    height: `${height}px`,
                    width,
                    left,
                    zIndex: isMultiDay ? 10 : 1 
                  }}
                >
                  <TaskItem
                    task={task}
                    height={height}
                    isMultiDay={isMultiDay}
                  />
                </div>
              )
            })}
            <CurrentTimeLine />
          </div>
        </div>
      ))}
    </div>
  )
}