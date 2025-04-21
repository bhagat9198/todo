import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../../data/gamification'

interface AchievementPopupProps {
  badge: Badge | null
  onClose: () => void
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ badge, onClose }) => {
  React.useEffect(() => {
    if (badge) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [badge, onClose])

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className="fixed bottom-6 right-6 bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg flex items-center gap-4 max-w-sm"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">{badge.icon}</span>
          </div>
          <div>
            <h3 className="font-medium mb-1">Achievement Unlocked!</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {badge.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-text-secondary-light hover:text-text-primary-light p-1"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}