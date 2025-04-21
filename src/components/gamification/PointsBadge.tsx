import React from 'react'
import { motion } from 'framer-motion'

interface PointsBadgeProps {
  points: number
  isPositive?: boolean
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({ points, isPositive = true }) => {
  const sign = points >= 0 ? '+' : ''
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isPositive
          ? 'bg-status-success/10 text-status-success'
          : 'bg-status-error/10 text-status-error'
      }`}
    >
      {sign}{points} pts
    </motion.div>
  )
}