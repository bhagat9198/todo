import React from 'react'
import { TaskCard } from '../components/cards/TaskCard'
import { StreakCard } from '../components/cards/StreakCard'
import { InsightCard } from '../components/cards/InsightCard'
import { OverdueCard } from '../components/cards/OverdueCard'
import { TaskCalendar } from '../components/calendar/TaskCalendar'
import { FloatingActionButton } from '../components/FloatingActionButton'
import { motion } from 'framer-motion'
import { Timer, X, History, FolderOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  const [showTimer, setShowTimer] = React.useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background-light via-background-accent to-background-light dark:from-dark-background dark:via-dark-primary dark:to-dark-background overflow-hidden">
      {/* Floating Timer */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: showTimer ? 0 : 100 }}
        className="fixed top-20 right-0 z-50"
      >
        <div className="flex items-center gap-2 bg-white dark:bg-dark-card p-3 rounded-l-xl shadow-lg">
          <Timer className="w-5 h-5 text-primary" />
          <span className="font-semibold">25:00</span>
          <button onClick={() => setShowTimer(false)} className="hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <main className="relative max-w-container mx-auto p-6 space-y-8">
        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent">
            Make Today Count!
          </h1>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
            You've completed 5 tasks today. Keep going!
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.button
              onClick={() => navigate('/dashboard/history')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-card/80 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <History className="w-4 h-4 text-primary" />
              <span>View History</span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/dashboard/categories')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-card/80 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <FolderOpen className="w-4 h-4 text-secondary" />
              <span>Manage Categories</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 desktop:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="desktop:col-span-8 space-y-6">
            <TaskCard />
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
              <InsightCard />
              <OverdueCard />
            </div>
          </div>

          {/* Side Content */}
          <div className="desktop:col-span-4 space-y-6">
            <StreakCard />
            
            {/* Quick Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card backdrop-blur-md bg-white/80 dark:bg-dark-card/80 p-6"
            >
              <h2 className="text-h3 font-heading mb-6 text-gradient">Quick Stats</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body-small">Focus Time</span>
                    <span className="text-body-large font-semibold">2.5 hrs</span>
                  </div>
                  <div className="h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body-small">Productivity</span>
                    <span className="text-body-large font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setShowTimer(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Start Focus Timer
                </button>
              </div>
            </motion.div>

            {/* Calendar */}
            <TaskCalendar />
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  )
}