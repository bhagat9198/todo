export interface Insight {
  id: string;
  message: string;
  type: 'productivity' | 'habit' | 'focus';
}

export const insights: Insight[] = [
  {
    id: '1',
    message: 'Focus on your morning routine tasks first!',
    type: 'productivity'
  },
  {
    id: '2',
    message: 'You are most productive between 9 AM and 11 AM',
    type: 'focus'
  },
  {
    id: '3',
    message: 'Consider breaking large tasks into smaller chunks',
    type: 'habit'
  }
];