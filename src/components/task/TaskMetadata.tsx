import React, { memo } from 'react'
import { Clock, FolderIcon, Paperclip, CheckCircle2 } from 'lucide-react'
import { Task } from '../../data/tasks'

interface TaskMetadataProps {
  task: Task
}

const TaskMetadataComponent: React.FC<TaskMetadataProps> = ({ task }) => {
  const completedSubtasks = task.subtasks.filter(st => st.completed).length

  return (
    <div className="flex items-center gap-4 text-text-secondary-light dark:text-text-secondary-dark">
      <div className="flex items-center gap-1" title={`Due at ${new Date(task.dueDate).toLocaleString()}`}>
        <Clock className="w-4 h-4" aria-hidden="true" />
        <span className="text-body-small">
          Due {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <FolderIcon className="w-4 h-4" aria-hidden="true" />
        <span className="text-body-small">{task.category}</span>
      </div>
      {task.attachments > 0 && (
        <div className="flex items-center gap-1">
          <Paperclip className="w-4 h-4" aria-hidden="true" />
          <span className="text-body-small">
            {task.attachments} {task.attachments === 1 ? 'file' : 'files'}
          </span>
        </div>
      )}
      {task.subtasks.length > 0 && (
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span className="text-body-small">
            {completedSubtasks}/{task.subtasks.length} completed
          </span>
        </div>
      )}
    </div>
  )
}

export const TaskMetadata = memo(TaskMetadataComponent)