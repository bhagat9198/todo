import React, { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { 
  ArrowLeft, Calendar, Clock, Trash2, Plus, Save, 
  FolderIcon, Paperclip, MessageSquare, AlertCircle,
  CheckCircle2, X, ChevronDown, ChevronUp, BookOpen,
  Briefcase, Heart, GraduationCap, ShoppingCart, Users,
  CircleDot
} from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { Task, Subtask } from '../data/tasks'
import { Select } from '../components/ui/Select'
import { Tabs, TabsContent } from '../components/ui/Tabs'
import ReactMarkdown from 'react-markdown'

const CATEGORIES = [
  { value: 'Personal', label: 'Personal', icon: BookOpen },
  { value: 'Work', label: 'Work', icon: Briefcase },
  { value: 'Health', label: 'Health', icon: Heart },
  { value: 'Learning', label: 'Learning', icon: GraduationCap },
  { value: 'Shopping', label: 'Shopping', icon: ShoppingCart },
  { value: 'Family', label: 'Family', icon: Users }
]

const PRIORITIES = [
  { value: 'low', label: 'Low Priority', color: 'bg-status-success' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-status-warning' },
  { value: 'high', label: 'High Priority', color: 'bg-status-error' }
]

const createEmptyTask = (): Task => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
  completed: false,
  startDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  priority: 'medium',
  category: 'Personal',
  attachments: [],
  comments: [],
  subtasks: []
})

const createEmptySubtask = (taskId: string): Subtask => ({
  id: `${taskId}-${Date.now()}`,
  title: '',
  description: '',
  completed: false,
  startDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  priority: 'medium',
  attachments: [],
  comments: []
})

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const task = useTaskStore(state => state.tasks.find(t => t.id === id))
  const isNewTask = id === 'new'
  
  const [editedTask, setEditedTask] = useState<Task>(task || createEmptyTask())
  const [newSubtask, setNewSubtask] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [expandedSubtasks, setExpandedSubtasks] = useState(true)
  const [activeSubtaskTab, setActiveSubtaskTab] = useState<string | null>(null)
  
  const updateTask = useTaskStore(state => state.updateTask)
  const addTask = useTaskStore(state => state.addTask)
  const deleteTask = useTaskStore(state => state.deleteTask)

  const progress = editedTask.subtasks.length 
    ? (editedTask.subtasks.filter(st => st.completed).length / editedTask.subtasks.length) * 100 
    : 0

  const handleSave = useCallback(() => {
    if (editedTask.title.trim() === '') {
      alert('Please enter a task title')
      return
    }

    if (isNewTask) {
      addTask(editedTask)
    } else {
      updateTask(editedTask)
    }
    navigate('/')
  }, [editedTask, isNewTask, addTask, updateTask, navigate])

  const handleDelete = useCallback(() => {
    if (!isNewTask) {
      deleteTask(id!)
      navigate('/dashboard')
    }
  }, [id, isNewTask, deleteTask, navigate])

  const addSubtask = useCallback(() => {
    if (newSubtask.trim()) {
      const newSubtaskItem = {
        ...createEmptySubtask(editedTask.id),
        title: newSubtask.trim()
      }
      setEditedTask({
        ...editedTask,
        subtasks: [...editedTask.subtasks, newSubtaskItem]
      })
      setNewSubtask('')
    }
  }, [newSubtask, editedTask])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background-accent to-background-light dark:from-dark-background dark:via-dark-primary/20 dark:to-dark-background">
      {/* Header with Progress */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-border-light dark:border-border-dark"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col">
            <div className="px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-text-secondary-light hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-4">
                {!isNewTask && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>{isNewTask ? 'Create Task' : 'Save Changes'}</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-background-accent dark:bg-dark-primary w-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Title and Quick Actions */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={editedTask.title}
              onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
              className="text-4xl font-heading bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              placeholder="What needs to be done?"
            />
            <div className="flex flex-wrap items-center gap-4">
              {/* Priority Selector */}
              <Select
                value={editedTask.priority}
                onValueChange={(value) => setEditedTask({ ...editedTask, priority: value as Task['priority'] })}
                options={PRIORITIES.map(priority => ({
                  value: priority.value,
                  label: (
                    <div className="flex items-center gap-2">
                      <CircleDot className={`w-3 h-3 ${priority.color}`} />
                      <span>{priority.label}</span>
                    </div>
                  )
                }))}
                className="w-40"
              />

              {/* Category Selector */}
              <Select
                value={editedTask.category}
                onValueChange={(value) => setEditedTask({ ...editedTask, category: value })}
                options={CATEGORIES.map(category => ({
                  value: category.value,
                  label: (
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </div>
                  )
                }))}
                className="w-40"
              />

              <div className="flex items-center gap-2 text-text-secondary-light">
                <Clock className="w-4 h-4" />
                <span>{format(parseISO(editedTask.dueDate), 'PPp')}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-h4 font-heading mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Description
            </h2>
            <textarea
              value={editedTask.description}
              onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Add a detailed description..."
              className="w-full min-h-[100px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
            />
            {editedTask.description && (
              <div className="mt-4 p-4 bg-background-accent/30 dark:bg-dark-primary/30 rounded-lg">
                <ReactMarkdown>{editedTask.description}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-h4 font-heading mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Timeline
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary-light mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={editedTask.startDate.slice(0, 16)}
                  onChange={e => setEditedTask({ ...editedTask, startDate: new Date(e.target.value).toISOString() })}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary-light mb-2">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={editedTask.dueDate.slice(0, 16)}
                  onChange={e => setEditedTask({ ...editedTask, dueDate: new Date(e.target.value).toISOString() })}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Subtasks */}
          <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl">
            <button
              onClick={() => setExpandedSubtasks(!expandedSubtasks)}
              className="w-full px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h2 className="text-h4 font-heading">Subtasks</h2>
                <span className="text-sm text-text-secondary-light">
                  ({editedTask.subtasks.filter(st => st.completed).length}/{editedTask.subtasks.length})
                </span>
              </div>
              {expandedSubtasks ? (
                <ChevronUp className="w-5 h-5 text-text-secondary-light" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary-light" />
              )}
            </button>

            <AnimatePresence>
              {expandedSubtasks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4">
                    {editedTask.subtasks.map((subtask, index) => (
                      <motion.div
                        key={subtask.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="group rounded-lg bg-background-accent/30 dark:bg-dark-primary/30 hover:bg-background-accent/50 dark:hover:bg-dark-primary/50 transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-4">
                            <input
                              type="checkbox"
                              checked={subtask.completed}
                              onChange={() => {
                                const newSubtasks = [...editedTask.subtasks]
                                newSubtasks[index] = { ...subtask, completed: !subtask.completed }
                                setEditedTask({ ...editedTask, subtasks: newSubtasks })
                              }}
                              className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <div className="flex-1 space-y-4">
                              <div className="flex items-start justify-between">
                                <input
                                  type="text"
                                  value={subtask.title}
                                  onChange={e => {
                                    const newSubtasks = [...editedTask.subtasks]
                                    newSubtasks[index] = { ...subtask, title: e.target.value }
                                    setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                  }}
                                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 font-medium"
                                  placeholder="Subtask title"
                                />
                                <button
                                  onClick={() => {
                                    const newSubtasks = editedTask.subtasks.filter(st => st.id !== subtask.id)
                                    setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                  }}
                                  className="p-1 opacity-0 group-hover:opacity-100 text-status-error hover:bg-status-error/10 rounded transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Subtask Tabs */}
                              <Tabs
                                defaultValue="details"
                                tabs={[
                                  { value: 'details', label: 'Details' },
                                  { value: 'description', label: 'Description' },
                                  { value: 'attachments', label: 'Attachments' },
                                  { value: 'comments', label: 'Comments' }
                                ]}
                              >
                                <TabsContent value="details" className="pt-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <input
                                      type="datetime-local"
                                      value={subtask.startDate.slice(0, 16)}
                                      onChange={e => {
                                        const newSubtasks = [...editedTask.subtasks]
                                        newSubtasks[index] = { 
                                          ...subtask, 
                                          startDate: new Date(e.target.value).toISOString() 
                                        }
                                        setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                      }}
                                      className="px-3 py-1 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                                    />
                                    <input
                                      type="datetime-local"
                                      value={subtask.dueDate.slice(0, 16)}
                                      onChange={e => {
                                        const newSubtasks = [...editedTask.subtasks]
                                        newSubtasks[index] = { 
                                          ...subtask, 
                                          dueDate: new Date(e.target.value).toISOString() 
                                        }
                                        setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                      }}
                                      className="px-3 py-1 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                                    />
                                    <Select
                                      value={subtask.priority}
                                      onValueChange={(value) => {
                                        const newSubtasks = [...editedTask.subtasks]
                                        newSubtasks[index] = { 
                                          ...subtask, 
                                          priority: value as Subtask['priority'] 
                                        }
                                        setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                      }}
                                      options={PRIORITIES.map(priority => ({
                                        value: priority.value,
                                        label: (
                                          <div className="flex items-center gap-2">
                                            <CircleDot className={`w-3 h-3 ${priority.color}`} />
                                            <span>{priority.label}</span>
                                          </div>
                                        )
                                      }))}
                                    />
                                  </div>
                                </TabsContent>

                                <TabsContent value="description" className="pt-4">
                                  <textarea
                                    value={subtask.description}
                                    onChange={e => {
                                      const newSubtasks = [...editedTask.subtasks]
                                      newSubtasks[index] = { 
                                        ...subtask, 
                                        description: e.target.value 
                                      }
                                      setEditedTask({ ...editedTask, subtasks: newSubtasks })
                                    }}
                                    placeholder="Add a description for this subtask..."
                                    className="w-full min-h-[100px] px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20 resize-none"
                                  />
                                </TabsContent>

                                <TabsContent value="attachments" className="pt-4">
                                  <div className="flex items-center justify-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-4">
                                    <div className="text-center">
                                      <Paperclip className="w-6 h-6 text-text-secondary-light mx-auto mb-2" />
                                      <p className="text-sm text-text-secondary-light mb-2">
                                        Drag and drop files here
                                      </p>
                                      <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                        Browse Files
                                      </button>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="comments" className="pt-4">
                                  <div className="space-y-4">
                                    {subtask.comments.map(comment => (
                                      <div key={comment.id} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                          {comment.userName[0]}
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">{comment.userName}</span>
                                            <span className="text-sm text-text-secondary-light">
                                              {format(parseISO(comment.createdAt), 'PPp')}
                                            </span>
                                          </div>
                                          <p className="text-sm mt-1">{comment.text}</p>
                                        </div>
                                      </div>
                                    ))}
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                                      />
                                      <button className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Add New Subtask */}
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={newSubtask}
                        onChange={e => setNewSubtask(e.target.value)}
                        placeholder="Add new subtask"
                        className="flex-1 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white/50 dark:bg-dark-primary/50 focus:ring-2 focus:ring-primary/20"
                        onKeyPress={e => e.key === 'Enter' && addSubtask()}
                      />
                      <button
                        onClick={addSubtask}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Task Attachments */}
          <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-h4 font-heading mb-4 flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-primary" />
              Attachments
            </h2>
            <div className="flex items-center justify-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-8">
              <div className="text-center">
                <Paperclip className="w-8 h-8 text-text-secondary-light mx-auto mb-2" />
                <p className="text-text-secondary-light mb-2">Drag and drop files here</p>
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-card rounded-xl p-6 max-w-md mx-4 w-full"
            >
              <div className="flex items-center gap-3 mb-4 text-status-error">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-h3 font-heading">Delete Task</h3>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-border-light dark:border-border-dark rounded-lg hover:bg-background-accent/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-status-error text-white rounded-lg hover:bg-status-error/90"
                >
                  Delete Task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}