export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'tasks' | 'streak' | 'early' | 'points';
}

export interface Achievement {
  badgeId: string;
  earnedAt: string;
  taskId?: string;
}

export interface Points {
  amount: number;
  reason: string;
  earnedAt: string;
  taskId: string;
}

export const POINTS_CONFIG = {
  PRIORITY: {
    high: 20,
    medium: 10,
    low: 5
  },
  OVERDUE_PENALTY: -5,
  EARLY_BONUS: 5
};

export const BADGES: Badge[] = [
  {
    id: 'taskmaster',
    name: 'Taskmaster',
    description: 'Complete 50 tasks',
    icon: '🏆',
    requirement: 50,
    type: 'tasks'
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete 10 tasks before the due time',
    icon: '🌅',
    requirement: 10,
    type: 'early'
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Complete 7 tasks consecutively',
    icon: '🔥',
    requirement: 7,
    type: 'streak'
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 1000 points',
    icon: '⭐',
    requirement: 1000,
    type: 'points'
  }
];