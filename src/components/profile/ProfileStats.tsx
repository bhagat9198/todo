import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Flame, TrendingUp, Clock, Target, ChevronDown } from 'lucide-react'
import { format, subDays, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns'
import { useTaskStore } from '../../store/taskStore'
import Chart from 'chart.js/auto'
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export const ProfileStats: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks)
  const [timeRange, setTimeRange] = useState('7')
  const completedTasks = tasks.filter(task => task.completed).length
  const overdueTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length
  const streak = 7 // This would come from your streak tracking logic

  const stats = [
    {
      icon: CheckCircle2,
      label: 'Completed Tasks',
      value: completedTasks,
      color: 'text-status-success',
      bgColor: 'from-status-success/20 to-status-success/5'
    },
    {
      icon: AlertCircle,
      label: 'Overdue Tasks',
      value: overdueTasks,
      color: 'text-status-error',
      bgColor: 'from-status-error/20 to-status-error/5'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${streak} days`,
      color: 'text-accent-red',
      bgColor: 'from-accent-red/20 to-accent-red/5'
    }
  ]

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '85%',
      change: '+5%',
      isPositive: true
    },
    {
      icon: Clock,
      label: 'Avg. Completion Time',
      value: '2.5 hrs',
      change: '-30min',
      isPositive: true
    },
    {
      icon: Target,
      label: 'Task Accuracy',
      value: '92%',
      change: '+2%',
      isPositive: true
    }
  ]

  // Generate activity data for the selected time range
  const getActivityData = () => {
    const days = parseInt(timeRange)
    const dateRange = eachDayOfInterval({
      start: subDays(new Date(), days - 1),
      end: new Date()
    })

    return dateRange.map(date => {
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate)
        return taskDate >= dayStart && taskDate <= dayEnd
      })

      const completed = dayTasks.filter(task => task.completed).length
      const total = dayTasks.length

      return {
        date,
        completed,
        total,
        percentage: total > 0 ? (completed / total) * 100 : 0
      }
    })
  }

  const activityData = getActivityData()

  // Chart.js configuration
  const chartData = {
    labels: activityData.map(day => format(day.date, 'EEE')),
    datasets: [
      {
        label: 'Total Tasks',
        data: activityData.map(day => day.total),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Completed Tasks',
        data: activityData.map(day => day.completed),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderWidth: 2,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: 'rgba(156, 163, 175, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} tasks`;
          }
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            <div className="relative p-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <h3 className="font-medium">{stat.label}</h3>
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6"
      >
        <h2 className="text-xl font-bold mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-text-secondary-light">
                <metric.icon className="w-4 h-4" />
                <span className="text-sm">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`text-sm font-medium ${
                  metric.isPositive ? 'text-status-success' : 'text-status-error'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="h-2 bg-background-accent dark:bg-dark-primary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: metric.value }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Activity Overview</h2>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-background-accent/50 dark:bg-dark-primary/50 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-light pointer-events-none" />
          </div>
        </div>
        
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>
    </motion.div>
  )
}