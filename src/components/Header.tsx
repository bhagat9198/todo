import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Menu, Moon, Sun, History, User, FolderOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '../store/themeStore'

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 glassmorphism px-6 py-4">
      <div className="max-w-container mx-auto flex items-center justify-between">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-h2 font-heading font-bold"
        >
          <Link to="/" className="text-gradient">Goalify</Link>
        </motion.h1>
        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard/history"
            className={`text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors ${
              location.pathname === '/history' ? 'text-primary dark:text-primary-light' : ''
            }`}
          >
            <History className="w-5 h-5" />
          </Link>
          <Link 
            to="/dashboard/categories"
            className={`text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors ${
              location.pathname === '/categories' ? 'text-primary dark:text-primary-light' : ''
            }`}
          >
            <FolderOpen className="w-5 h-5" />
          </Link>
          <Link 
            to="/dashboard/profile"
            className={`text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors ${
              location.pathname === '/profile' ? 'text-primary dark:text-primary-light' : ''
            }`}
          >
            <User className="w-5 h-5" />
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button> */}
        </div>
      </div>
    </header>
  )
}