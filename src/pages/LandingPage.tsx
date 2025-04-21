import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Brain, Calendar, ListTodo, ArrowRight, Star, CheckCircle2, Zap } from 'lucide-react'
import { LandingHeader } from '../components/landing/LandingHeader'
import { FeatureCard } from '../components/landing/FeatureCard'
import { DemoSection } from '../components/landing/DemoSection'
import { AISection } from '../components/landing/AISection'
import { TestimonialSection } from '../components/landing/TestimonialSection'
import { LandingFooter } from '../components/landing/LandingFooter'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get smart task recommendations and productivity insights powered by AI.',
      color: 'from-primary to-secondary'
    },
    {
      icon: ListTodo,
      title: 'Task & Subtask Management',
      description: 'Break down complex projects into manageable tasks and subtasks.',
      color: 'from-accent-purple to-accent-pink'
    },
    {
      icon: Calendar,
      title: 'Dynamic Calendar View',
      description: 'Visualize your tasks in an intuitive calendar interface.',
      color: 'from-accent-yellow to-accent-red'
    }
  ]

  const benefits = [
    {
      icon: Star,
      title: 'Smart Prioritization',
      description: 'AI helps you focus on what matters most by analyzing task patterns and deadlines.'
    },
    {
      icon: CheckCircle2,
      title: 'Progress Tracking',
      description: 'Monitor your productivity with detailed insights and completion statistics.'
    },
    {
      icon: Zap,
      title: 'Instant Productivity',
      description: 'Get started quickly with an intuitive interface and helpful AI suggestions.'
    }
  ]

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-dark-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent-yellow/20 to-accent-red/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent mb-6"
            >
              Transform Your Productivity with Goalify
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8"
            >
              A smart task manager powered by AI. Organize, prioritize, and track your tasks effortlessly, with intuitive features and seamless task management.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all group"
              >
                <span className="flex items-center gap-2">
                  Start Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={scrollToDemo}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <DemoSection />

      {/* AI Features */}
      <AISection benefits={benefits} />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}