import React, { memo } from 'react'
import { Subtask } from '../../data/tasks'

interface SubtaskListProps {
  subtasks: Subtask[]
}

const SubtaskListComponent: React.FC<SubtaskListProps> = ({ subtasks }) => {
  if (subtasks.length === 0) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Subtasks">
      {subtasks.map(subtask => (
        <div
          key={subtask.id}
          role="listitem"
          className={`text-xs px-2 py-1 rounded-full border ${
            subtask.completed
              ? 'border-primary/20 bg-primary/10 text-primary line-through'
              : 'border-border-light dark:border-border-dark bg-background-accent/30 dark:bg-dark-primary/30'
          }`}
        >
          {subtask.title}
        </div>
      ))}
    </div>
  )
}

export const SubtaskList = memo(SubtaskListComponent)