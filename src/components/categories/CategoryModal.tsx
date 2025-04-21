import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FolderPlus, Check } from 'lucide-react'
import { useCategoryStore } from '../../store/categoryStore'
import { CategoryIcon, CATEGORY_ICONS } from '../../constants/categoryIcons'
import { CategoryColor, CATEGORY_COLORS, CATEGORY_COLOR_SQUARES } from '../../constants/categoryColors'

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  category?: {
    id: string
    name: string
    icon: CategoryIcon
    color: CategoryColor
  }
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  category
}) => {
  const [name, setName] = useState(category?.name || '')
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(category?.icon || CATEGORY_ICONS[0])
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(category?.color || CATEGORY_COLORS[0])

  const addCategory = useCategoryStore(state => state.addCategory)
  const updateCategory = useCategoryStore(state => state.updateCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) return

    if (category) {
      updateCategory({
        id: category.id,
        name: name.trim(),
        icon: selectedIcon,
        color: selectedColor
      })
    } else {
      addCategory({
        id: crypto.randomUUID(),
        name: name.trim(),
        icon: selectedIcon,
        color: selectedColor
      })
    }

    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-xl mt-20 mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${selectedColor.bg}`}>
                    <FolderPlus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {category ? 'Edit Category' : 'New Category'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full px-4 py-2.5 bg-background-accent/30 dark:bg-dark-primary/30 rounded-xl border-2 border-transparent focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {CATEGORY_ICONS.map(icon => (
                      <button
                        key={icon.name}
                        type="button"
                        onClick={() => setSelectedIcon(icon)}
                        className={`
                          aspect-square rounded-full flex items-center justify-center transition-all
                          ${selectedIcon === icon 
                            ? `${selectedColor.bg} text-white` 
                            : 'hover:bg-background-accent/50'
                          }
                        `}
                      >
                        <icon.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {CATEGORY_COLOR_SQUARES.map(color => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`
                          ${color.size} rounded-lg transition-all
                          ${color.bg}
                          ${selectedColor === color 
                            ? 'ring-2 ring-offset-2 ring-primary' 
                            : ''
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-text-secondary-light hover:text-text-primary-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`
                      flex items-center gap-2 px-6 py-2 text-white rounded-xl 
                      transition-colors ${selectedColor.bg} hover:opacity-90
                    `}
                  >
                    <Check className="w-4 h-4" />
                    <span>{category ? 'Update' : 'Create'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}