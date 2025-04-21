import React from 'react'
import { motion } from 'framer-motion'
import { DivideIcon as LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  index: number
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index
}) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative overflow-hidden bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className={`relative flex items-center gap-12 p-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
          className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="text-2xl font-bold mb-3"
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4 }}
            className="text-lg text-text-secondary-light dark:text-text-secondary-dark"
          >
            {description}
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      </div>
    </motion.div>
  )
}