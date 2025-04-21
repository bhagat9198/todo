import React from 'react'
import { motion } from 'framer-motion'
import { useGamificationStore } from '../../store/gamificationStore'

interface BadgeProgressProps {
  type: string
}

export const BadgeProgress: React.FC<BadgeProgressProps> = ({ type }) => {
  const progress = useGamificationStore(state => state.getProgressToNextBadge(type))
  const percentage = Math.min((progress.current / progress.required) * 100, 100)

  return (
    <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-3xl">{progress.badge.icon}</span>
        <div>
          <h3 className="text-sm font-medium">{progress.badge.name}</h3>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {progress.badge.description}
          </p>
        </div>
      </div>
      <div className="relative h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
      <div className="mt-1 text-xs text-text-secondary-light dark:text-text-secondary-dark text-right">
        {progress.current} / {progress.required}
      </div>
    </div>
  )
}