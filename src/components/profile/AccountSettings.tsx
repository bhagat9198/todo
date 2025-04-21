import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, X, Check, Loader, AlertCircle } from 'lucide-react'

interface FormState {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface ValidationErrors {
  email?: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export const AccountSettings: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'email' | 'password' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [formData, setFormData] = useState<FormState>({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (activeForm === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required'
      }
    } else if (activeForm === 'password') {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required'
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required'
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success feedback
      const message = activeForm === 'email' ? 'Email updated successfully!' : 'Password changed successfully!'
      // You would implement proper toast/notification here
      console.log(message)
      
      setActiveForm(null)
      setFormData({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const renderInput = (
    name: keyof FormState,
    label: string,
    type: string,
    placeholder: string,
    icon: React.ReactNode
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light">
          {icon}
        </div>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-xl
            bg-background-accent/30 dark:bg-dark-primary/30
            border-2 transition-all duration-200
            ${errors[name] 
              ? 'border-status-error/50 focus:border-status-error' 
              : 'border-transparent focus:border-primary/50'
            }
            focus:outline-none focus:ring-4 ${
              errors[name] ? 'focus:ring-status-error/10' : 'focus:ring-primary/10'
            }
          `}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-background-accent/50 rounded-lg transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-text-secondary-light" />
            ) : (
              <Eye className="w-4 h-4 text-text-secondary-light" />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-status-error text-sm mt-1.5"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name]}</span>
        </motion.div>
      )}
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Email Update Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveForm('email')}
        className="w-full flex items-center justify-between px-4 py-3 bg-background-accent/30 dark:bg-dark-primary/30 hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 rounded-xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Mail className="w-4 h-4" />
          </div>
          <span>Update Email</span>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: activeForm === 'email' ? 180 : 0 }}
          className="w-6 h-6 flex items-center justify-center text-text-secondary-light group-hover:text-primary transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Password Update Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveForm('password')}
        className="w-full flex items-center justify-between px-4 py-3 bg-background-accent/30 dark:bg-dark-primary/30 hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 rounded-xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
            <Lock className="w-4 h-4" />
          </div>
          <span>Change Password</span>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: activeForm === 'password' ? 180 : 0 }}
          className="w-6 h-6 flex items-center justify-center text-text-secondary-light group-hover:text-secondary transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {activeForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveForm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      activeForm === 'email' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      {activeForm === 'email' ? (
                        <Mail className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <h2 className="text-xl font-bold">
                      {activeForm === 'email' ? 'Update Email' : 'Change Password'}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveForm(null)}
                    className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeForm === 'email' ? (
                    <>
                      {renderInput(
                        'email',
                        'New Email Address',
                        'email',
                        'Enter new email address',
                        <Mail className="w-5 h-5" />
                      )}
                      {renderInput(
                        'currentPassword',
                        'Current Password',
                        'password',
                        'Enter current password',
                        <Lock className="w-5 h-5" />
                      )}
                    </>
                  ) : (
                    <>
                      {renderInput(
                        'currentPassword',
                        'Current Password',
                        'password',
                        'Enter current password',
                        <Lock className="w-5 h-5" />
                      )}
                      {renderInput(
                        'newPassword',
                        'New Password',
                        'password',
                        'Enter new password',
                        <Lock className="w-5 h-5" />
                      )}
                      {renderInput(
                        'confirmPassword',
                        'Confirm Password',
                        'password',
                        'Confirm new password',
                        <Lock className="w-5 h-5" />
                      )}
                    </>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveForm(null)}
                      className="px-4 py-2 text-text-secondary-light hover:text-text-primary-light transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`
                        px-6 py-2 rounded-xl text-white
                        flex items-center gap-2
                        transition-all duration-200
                        ${activeForm === 'email'
                          ? 'bg-primary hover:bg-primary-hover'
                          : 'bg-secondary hover:bg-secondary-hover'
                        }
                        ${loading ? 'opacity-80 cursor-not-allowed' : ''}
                      `}
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Confirm</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}