import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'
import { insights } from '../../data/insights'

export const InsightCard: React.FC = () => {
  const randomInsight = insights[Math.floor(Math.random() * insights.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card backdrop-blur-md bg-white/80 dark:bg-dark-card/80 p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-blue/20 to-accent-green/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-blue/10 to-accent-green/5 rounded-full blur-xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-accent-blue" />
            <h2 className="text-h3 font-heading">AI Insights</h2>
          </div>
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
          >
            <Sparkles className="w-5 h-5 text-accent-blue" />
          </motion.div>
        </div>
        <div className="relative">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-body-large relative z-10"
          >
            {randomInsight.message}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}