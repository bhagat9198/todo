import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

export const LandingHeader: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold font-heading text-gradient">
            Goalify
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-text-secondary-light hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-text-secondary-light hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="#about" className="text-text-secondary-light hover:text-primary transition-colors">
              About
            </Link>
            <Link to="#contact" className="text-text-secondary-light hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-text-secondary-light" />
              ) : (
                <Moon className="w-5 h-5 text-text-secondary-light" />
              )}
            </motion.button>

            <Link 
              to="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}