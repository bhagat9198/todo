import React from 'react'
import { motion } from 'framer-motion'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileProgress } from '../components/profile/ProfileProgress'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileActivity } from '../components/profile/ProfileActivity'
import { ProfileSettings } from '../components/profile/ProfileSettings'

export const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background-accent to-background-light dark:from-dark-background dark:via-dark-primary/20 dark:to-dark-background">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <ProfileHeader />
        
        <div className="grid grid-cols-1 desktop:grid-cols-12 gap-8">
          <div className="desktop:col-span-8 space-y-8">
            <ProfileProgress />
            <ProfileStats />
            <ProfileActivity />
          </div>
          
          <div className="desktop:col-span-4">
            <ProfileSettings />
          </div>
        </div>
      </div>
    </div>
  )
}