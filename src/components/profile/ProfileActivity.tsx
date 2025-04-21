import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { CheckCircle2, Clock, Star, Trophy, Medal, Award } from 'lucide-react'
import { useTaskStore } from '../../store/taskStore'

export const ProfileActivity: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks)
  const recentTasks = tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5)

  const achievements = [
    {
      icon: Trophy,
      title: 'Early Bird',
      description: 'Completed 5 tasks before 9 AM',
      date: new Date(),
      color: 'from-primary to-secondary'
    },
    {
      icon: Medal,
      title: 'Perfectionist',
      description: 'Completed all subtasks in a task',
      date: new Date(),
      color: 'from-accent-purple to-accent-pink'
    },
    {
      icon: Star,
      title: 'Streak Master',
      description: 'Maintained a 7-day streak',
      date: new Date(),
      color: 'from-accent-yellow to-accent-red'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors">
            Tasks
          </button>
          <button className="px-3 py-1.5 hover:bg-background-accent/50 rounded-lg text-sm transition-colors">
            Achievements
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Recent Tasks */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-secondary-light">Recent Tasks</h3>
          {recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center gap-4 p-4 bg-background-accent/30 dark:bg-dark-primary/30 rounded-xl hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 transition-all cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-status-success/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-5 h-5 text-status-success" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{task.title}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary-light">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(task.dueDate), 'PPp')}</span>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 bg-status-success/10 text-status-success rounded-lg text-sm font-medium"
              >
                +10 points
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-secondary-light">Recent Achievements</h3>
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group flex items-center gap-4 p-4 bg-background-accent/30 dark:bg-dark-primary/30 rounded-xl hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 transition-all cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
              >
                <achievement.icon className="w-5 h-5 text-white" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-text-secondary-light truncate">
                  {achievement.description}
                </p>
              </div>
              
              <div className="text-sm text-text-secondary-light">
                {format(achievement.date, 'MMM d')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}