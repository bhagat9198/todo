import { CategoryIcon } from '../constants/categoryIcons'
import { CategoryColor } from '../constants/categoryColors'

export interface Category {
  id: string
  name: string
  icon: CategoryIcon
  color: CategoryColor
}