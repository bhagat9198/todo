import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/dashboard/task/new')}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 blur-xl"
      />
      <Plus className="w-6 h-6 relative z-10" />
    </motion.button>
  )
}