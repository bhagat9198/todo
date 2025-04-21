import React from 'react'
import { motion } from 'framer-motion'
import { Award, Flame } from 'lucide-react'

export const StreakCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card backdrop-blur-md bg-white/80 dark:bg-dark-card/80 p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-purple/20 to-accent-pink/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-purple/10 to-accent-pink/5 rounded-full blur-xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-accent-purple" />
            <h2 className="text-h3 font-heading">Streak</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20"
            >
              <Flame className="w-12 h-12 text-accent-purple" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white text-body-small font-bold px-3 py-1 rounded-full shadow-lg"
            >
              7
            </motion.div>
          </div>
          <div className="text-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-h4 font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-1"
            >
              7 Day Streak!
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-body-small text-text-secondary-light dark:text-text-secondary-dark"
            >
              Keep up the great work!
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}