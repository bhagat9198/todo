import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

export const DemoSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} id="demo" className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold font-heading mb-4"
          >
            See Goalify in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary-light dark:text-text-secondary-dark"
          >
            Watch how Goalify helps you stay organized and productive
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Video Thumbnail */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
              alt="Demo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-primary/50 backdrop-blur-sm" />
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="relative">
              {/* Outer Ripple */}
              <motion.div
                animate={{
                  scale: [1, 1.8],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
              
              {/* Inner Ripple */}
              <motion.div
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.2
                }}
                className="absolute inset-0 bg-white/30 rounded-full"
              />
              
              {/* Play Button */}
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:bg-white/30 transition-colors duration-300">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}