import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Achievement, Points, POINTS_CONFIG, BADGES } from '../data/gamification'

interface GamificationStore {
  points: Points[];
  achievements: Achievement[];
  addPoints: (points: Points) => void;
  addAchievement: (achievement: Achievement) => void;
  calculateTaskPoints: (taskId: string, priority: string, completed: boolean, isOverdue: boolean, isEarly: boolean) => number;
  getTotalPoints: () => number;
  getTaskPoints: (taskId: string) => number;
  hasAchievement: (badgeId: string) => boolean;
  getProgressToNextBadge: (type: string) => { current: number; required: number; badge: typeof BADGES[0] };
}

export const useGamificationStore = create<GamificationStore>()(
  devtools(
    (set, get) => ({
      points: [],
      achievements: [],

      addPoints: (points) => set(
        (state) => ({ points: [...state.points, points] }),
        false,
        'gamification/addPoints'
      ),

      addAchievement: (achievement) => set(
        (state) => ({ achievements: [...state.achievements, achievement] }),
        false,
        'gamification/addAchievement'
      ),

      calculateTaskPoints: (taskId, priority, completed, isOverdue, isEarly) => {
        if (!completed) return 0;

        let points = POINTS_CONFIG.PRIORITY[priority as keyof typeof POINTS_CONFIG.PRIORITY] || 0;

        if (isOverdue) {
          points += POINTS_CONFIG.OVERDUE_PENALTY;
        }

        if (isEarly) {
          points += POINTS_CONFIG.EARLY_BONUS;
        }

        return points;
      },

      getTotalPoints: () => {
        return get().points.reduce((total, p) => total + p.amount, 0);
      },

      getTaskPoints: (taskId) => {
        return get().points
          .filter(p => p.taskId === taskId)
          .reduce((total, p) => total + p.amount, 0);
      },

      hasAchievement: (badgeId) => {
        return get().achievements.some(a => a.badgeId === badgeId);
      },

      getProgressToNextBadge: (type) => {
        // Find a default badge to use if no relevant badges are found
        const defaultBadge = BADGES.find(b => b.type === type) || BADGES[0];

        try {
          const totalPoints = get().getTotalPoints();
          const completedTasks = new Set(get().points.map(p => p.taskId)).size;
          const achievements = get().achievements || [];

          // Find badges of the requested type that haven't been earned yet
          const relevantBadges = BADGES.filter(b => b.type === type)
            .filter(b => !achievements.some(a => a.badgeId === b.id))
            .sort((a, b) => a.requirement - b.requirement);

          // If no relevant badges found, return a default with 0 progress
          if (relevantBadges.length === 0) {
            return {
              current: 0,
              required: defaultBadge.requirement,
              badge: defaultBadge
            };
          }

          const nextBadge = relevantBadges[0];
          let current = 0;

          // Calculate current progress based on badge type
          switch (type) {
            case 'points':
              current = totalPoints;
              break;
            case 'tasks':
              current = completedTasks;
              break;
            case 'streak':
              // Simple streak calculation - just return 1 if there are any points
              current = get().points.length > 0 ? 1 : 0;
              break;
            default:
              current = 0;
          }

          return {
            current,
            required: nextBadge.requirement,
            badge: nextBadge
          };
        } catch (error) {
          // If anything goes wrong, return a safe default
          console.error('Error in getProgressToNextBadge:', error);
          return {
            current: 0,
            required: defaultBadge.requirement,
            badge: defaultBadge
          };
        }
      }
    }),
    { name: 'gamification-store' }
  )
)