import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Zap, Star } from 'lucide-react'
import { useGamificationStore } from '../../store/gamificationStore'

export const ProfileProgress: React.FC = () => {
  const taskmasterProgress = useGamificationStore(state => state.getProgressToNextBadge('tasks'))
  const pointCollectorProgress = useGamificationStore(state => state.getProgressToNextBadge('points'))
  const streakProgress = useGamificationStore(state => state.getProgressToNextBadge('streak'))

  const badges = [
    {
      icon: Trophy,
      name: 'Taskmaster',
      description: 'Complete tasks to earn this badge',
      progress: taskmasterProgress,
      color: 'from-primary to-secondary'
    },
    {
      icon: Award,
      name: 'Point Collector',
      description: 'Earn points from completing tasks',
      progress: pointCollectorProgress,
      color: 'from-accent-purple to-accent-pink'
    },
    {
      icon: Zap,
      name: 'Streak Champion',
      description: 'Maintain your daily streak',
      progress: streakProgress,
      color: 'from-accent-yellow to-accent-red'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Progress & Achievements</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary-hover transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
        {badges.map((badge, index) => {
          const percentage = (badge.progress.current / badge.progress.required) * 100
          
          return (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden bg-background-accent/30 dark:bg-dark-primary/30 rounded-xl p-6 group"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${badge.color}`}
                  >
                    <badge.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-text-secondary-light">{badge.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary-light">Progress</span>
                    <span className="font-medium">
                      {badge.progress.current}/{badge.progress.required}
                    </span>
                  </div>
                  <div className="h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className={`h-full bg-gradient-to-r ${badge.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}