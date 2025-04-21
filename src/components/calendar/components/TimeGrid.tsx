import React from 'react'
import { format } from 'date-fns'
import { HOUR_HEIGHT } from '../constants'

export const TimeGrid: React.FC = () => {
  return (
    <div className="relative border-l border-border-light dark:border-border-dark">
      {Array.from({ length: 24 }).map((_, hour) => (
        <div 
          key={hour}
          className="border-b border-border-light dark:border-border-dark relative"
          style={{ height: HOUR_HEIGHT }}
        >
          <span className="absolute -left-16 text-sm text-text-secondary-light">
            {format(new Date().setHours(hour), 'HH:mm')}
          </span>
          <div className="absolute inset-0 bg-background-accent/5 dark:bg-dark-primary/5" />
        </div>
      ))}
    </div>
  )
}