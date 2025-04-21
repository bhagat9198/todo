import React from 'react'
import { motion } from 'framer-motion'
import { DivideIcon as LucideIcon } from 'lucide-react'

interface AIBenefit {
  icon: LucideIcon
  title: string
  description: string
}

interface AISectionProps {
  benefits: AIBenefit[]
}

export const AISection: React.FC<AISectionProps> = ({ benefits }) => {
  return (
    <section className="py-24 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold font-heading mb-6"
            >
              Let AI Enhance Your Productivity
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8"
            >
              AI assists in understanding your task completion trends, provides suggestions, and helps set reminders tailored to your habits.
            </motion.p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80"
              alt="AI Assistant"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}