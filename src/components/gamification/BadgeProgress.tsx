import React from 'react'
import { motion } from 'framer-motion'
import { useGamificationStore } from '../../store/gamificationStore'

interface BadgeProgressProps {
  type: string
}

export const BadgeProgress: React.FC<BadgeProgressProps> = ({ type }) => {
  // Use useMemo to prevent unnecessary recalculations and add error handling
  const progress = React.useMemo(() => {
    try {
      return useGamificationStore.getState().getProgressToNextBadge(type);
    } catch (error) {
      console.error(`Error getting progress for badge type ${type}:`, error);
      return {
        current: 0,
        required: 100,
        badge: {
          name: 'Badge',
          description: 'Complete tasks to earn this badge',
          icon: '⭐'
        }
      };
    }
  }, [type]);

  // Safely calculate percentage with error handling
  const percentage = React.useMemo(() => {
    try {
      if (!progress || typeof progress.current !== 'number' || typeof progress.required !== 'number' || progress.required === 0) {
        return 0;
      }
      return Math.min((progress.current / progress.required) * 100, 100);
    } catch (error) {
      console.error('Error calculating percentage:', error);
      return 0;
    }
  }, [progress])

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