import React from 'react'
import { HOUR_HEIGHT } from '../constants'

export const CurrentTimeLine: React.FC = () => {
  const now = new Date()
  const top = now.getHours() * HOUR_HEIGHT + (now.getMinutes() / 60) * HOUR_HEIGHT
  
  return (
    <div 
      className="absolute left-0 right-0 border-t-2 border-primary z-20"
      style={{ top: `${top}px` }}
    >
      <div className="absolute -left-3 -top-1.5 w-3 h-3 rounded-full bg-primary" />
    </div>
  )
}