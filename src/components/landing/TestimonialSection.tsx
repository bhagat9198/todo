import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    content: 'Goalify has transformed how I manage my tasks. The AI suggestions are incredibly helpful, and the interface is beautiful and intuitive.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    content: 'As a developer, I appreciate the attention to detail and the smart features. It\'s helped me stay organized and focused on what matters.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    content: 'The calendar view and task organization features are exactly what I needed. It\'s made managing multiple projects so much easier.',
    rating: 5
  }
]

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-heading mb-4"
          >
            What Our Users Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary-light dark:text-text-secondary-dark"
          >
            Join thousands of satisfied users who have transformed their productivity
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/40 dark:bg-dark-card/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10" />
              
              {/* Content */}
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-sm" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-text-secondary-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-accent-yellow fill-current" />
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed"
                >
                  "{testimonial.content}"
                </motion.p>

                {/* Decorative Quote */}
                <div className="absolute -bottom-4 -right-4 text-8xl text-primary/10 font-serif">
                  "
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}