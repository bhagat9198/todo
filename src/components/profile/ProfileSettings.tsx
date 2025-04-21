import React from 'react'
import { motion } from 'framer-motion'
import { Bell, LogOut, Moon, Globe, User, Shield } from 'lucide-react'
import { AccountSettings } from './AccountSettings'

export const ProfileSettings: React.FC = () => {
  const settingSections = [
    {
      title: 'Account',
      icon: User,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      settings: [
        { label: 'Email notifications', checked: true },
        { label: 'Push notifications', checked: false },
        { label: 'Weekly digest', checked: true }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      color: 'text-accent-purple',
      bgColor: 'bg-accent-purple/10',
      settings: [
        { label: 'Public profile', checked: true },
        { label: 'Show badges', checked: true },
        { label: 'Show statistics', checked: false }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10',
      settings: [
        { label: 'Task reminders', checked: true },
        { label: 'Achievement alerts', checked: true },
        { label: 'Friend activity', checked: false }
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6 sticky top-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Settings</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
        >
          <Globe className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="space-y-8">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${section.bgColor}`}>
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <h3 className="font-medium">{section.title}</h3>
            </div>
            <div className="space-y-3">
              {section.settings.map((setting, index) => (
                <motion.label
                  key={setting.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-background-accent/30 dark:hover:bg-dark-primary/30 rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="text-sm">{setting.label}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      defaultChecked={setting.checked}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-background-accent dark:bg-dark-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </div>
                </motion.label>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="pt-4 space-y-4">
          <AccountSettings />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-status-error/10 hover:bg-status-error/20 text-status-error rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}