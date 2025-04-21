import { 
  Briefcase, BookOpen, Heart, GraduationCap, 
  ShoppingCart, Users, Coffee, Plane, Home,
  Music, Camera, Dumbbell
} from 'lucide-react'

export const CATEGORY_ICONS = [
  { name: 'work', icon: Briefcase },
  { name: 'personal', icon: BookOpen },
  { name: 'health', icon: Heart },
  { name: 'learning', icon: GraduationCap },
  { name: 'shopping', icon: ShoppingCart },
  { name: 'family', icon: Users },
  { name: 'leisure', icon: Coffee },
  { name: 'travel', icon: Plane },
  { name: 'home', icon: Home },
  { name: 'music', icon: Music },
  { name: 'photography', icon: Camera },
  { name: 'fitness', icon: Dumbbell }
] as const

export type CategoryIcon = typeof CATEGORY_ICONS[number]