import React from 'react'
import { Task } from '../../../data/tasks'
import { TimeGrid } from './TimeGrid'
import { CurrentTimeLine } from './CurrentTimeLine'
import { calculateTaskPosition } from '../utils'
import { TASK_COLORS } from '../constants'
import { TaskItem } from './TaskItem'

interface DayViewProps {
  date: Date
  tasks: Task[]
}

export const DayView: React.FC<DayViewProps> = ({ date, tasks }) => {
  return (
    <div className="relative" style={{ height: `${24 * 60}px` }}>
      <TimeGrid />
      {tasks.map((task, index) => {
        const { top, height, width, left } = calculateTaskPosition(task, tasks, date)
        
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
              left
            }}
          >
            <TaskItem
              task={task}
              height={height}
              isMultiDay={false}
            />
          </div>
        )
      })}
      <CurrentTimeLine />
    </div>
  )
}