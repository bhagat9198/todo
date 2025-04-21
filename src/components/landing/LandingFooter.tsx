import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'

export const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-accent/20 dark:to-dark-primary/20" />
      
      <div className="relative border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-block">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold font-heading text-gradient mb-4"
                >
                  Goalify
                </motion.h1>
              </Link>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary-light dark:text-text-secondary-dark"
              >
                Transform your productivity with AI-powered task management.
              </motion.p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2">
                  {['Features', 'Pricing', 'About'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Link 
                        to={`#${item.toLowerCase()}`}
                        className="text-text-secondary-light hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  {['Blog', 'Documentation', 'Help Center'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Link 
                        to={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-text-secondary-light hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  {['About Us', 'Careers', 'Contact'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Link 
                        to={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-text-secondary-light hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border-light dark:border-border-dark">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-text-secondary-light dark:text-text-secondary-dark"
              >
                © {currentYear} Goalify. All rights reserved.
              </motion.p>

              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                      className="p-2 rounded-full bg-background-accent/50 dark:bg-dark-primary/50 text-text-secondary-light hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}