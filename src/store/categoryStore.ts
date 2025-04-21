import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Category } from '../types/category'
import { CATEGORY_ICONS } from '../constants/categoryIcons'
import { CATEGORY_COLORS } from '../constants/categoryColors'

interface CategoryStore {
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  reorderCategories: (categories: Category[]) => void
}

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    (set) => ({
      categories: [
        {
          id: 'work',
          name: 'Work',
          icon: CATEGORY_ICONS[0],
          color: CATEGORY_COLORS[0]
        },
        {
          id: 'personal',
          name: 'Personal',
          icon: CATEGORY_ICONS[1],
          color: CATEGORY_COLORS[1]
        }
      ],
      
      addCategory: (category) => set(
        (state) => ({ categories: [...state.categories, category] }),
        false,
        'categories/add'
      ),
      
      updateCategory: (category) => set(
        (state) => ({
          categories: state.categories.map(c =>
            c.id === category.id ? category : c
          )
        }),
        false,
        'categories/update'
      ),
      
      deleteCategory: (id) => set(
        (state) => ({
          categories: state.categories.filter(c => c.id !== id)
        }),
        false,
        'categories/delete'
      ),
      
      reorderCategories: (categories) => set(
        { categories },
        false,
        'categories/reorder'
      )
    }),
    { name: 'category-store' }
  )
)