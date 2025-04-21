import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Edit2, Star, Settings } from 'lucide-react'
import { useGamificationStore } from '../../store/gamificationStore'

export const ProfileHeader: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('John Doe')
  const totalPoints = useGamificationStore(state => state.getTotalPoints())
  const [selectedTab, setSelectedTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'statistics', label: 'Statistics' }
  ]

  const badges = [
    { label: 'Taskmaster', progress: '45/50', color: 'bg-primary/10 text-primary' },
    { label: 'Point Collector', progress: '750/1000', color: 'bg-secondary/10 text-secondary' },
    { label: 'Streak Champion', progress: '5/7', color: 'bg-accent-purple/10 text-accent-purple' }
  ]

  return (
    <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-24 h-24 rounded-xl bg-background-accent dark:bg-dark-primary overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              >
                <Camera className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => setIsEditing(false)}
                      className="text-2xl font-bold bg-transparent border-b-2 border-primary focus:outline-none pr-8"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{username}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 text-text-secondary-light hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-text-secondary-light mt-1">Joined April 2025</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Points */}
                <div className="text-right flex gap-2 justify-center items-center">
                  <p className="text-sm text-text-secondary-light">Total Points</p>
                  <p className="text-xl font-bold text-primary">{totalPoints}</p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div key={badge.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary-light">{badge.label}</span>
                    <span className={`font-medium ${badge.color}`}>{badge.progress}</span>
                  </div>
                  <div className="h-1.5 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseInt(badge.progress.split('/')[0]) / parseInt(badge.progress.split('/')[1])) * 100}%` }}
                      className={`h-full ${badge.color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 border-t border-border-light dark:border-border-dark">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`relative py-4 text-sm transition-colors ${
                selectedTab === tab.id 
                  ? 'text-primary font-medium' 
                  : 'text-text-secondary-light hover:text-primary'
              }`}
            >
              {tab.label}
              {selectedTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}