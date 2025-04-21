import { z } from 'zod'

export const commentSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
  userId: z.string(),
  userName: z.string()
})

export const attachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  size: z.number(),
  createdAt: z.string()
})

export const subtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  startDate: z.string(),
  dueDate: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  attachments: z.array(attachmentSchema),
  comments: z.array(commentSchema)
})

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  startDate: z.string(),
  dueDate: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string(),
  attachments: z.array(attachmentSchema),
  comments: z.array(commentSchema),
  subtasks: z.array(subtaskSchema)
})

export type Comment = z.infer<typeof commentSchema>
export type Attachment = z.infer<typeof attachmentSchema>
export type Subtask = z.infer<typeof subtaskSchema>
export type Task = z.infer<typeof taskSchema>

const mockUser = {
  id: 'user-1',
  name: 'John Doe'
}

// Helper function to create dates
const createDate = (year: number, month: number, day: number, hours = 0, minutes = 0) => {
  const date = new Date(year, month - 1, day, hours, minutes)
  return date.toISOString()
}

export const tasks: Task[] = [
  // Work Category Tasks
  {
    id: '1',
    title: 'Project Planning Meeting 1',
    description: 'Quarterly planning meeting with the development team',
    completed: false,
    startDate: createDate(2025, 4, 20, 9, 0),
    dueDate: createDate(2025, 4, 20, 10, 30),
    priority: 'high',
    category: 'work',
    attachments: [],
    comments: [],
    subtasks: [
      {
        id: '1-1',
        title: 'Prepare agenda',
        description: 'Create meeting agenda and share with team',
        completed: true,
        startDate: createDate(2025, 4, 20, 9, 0),
        dueDate: createDate(2025, 4, 20, 9, 30),
        priority: 'medium',
        attachments: [],
        comments: []
      },
      {
        id: '1-2',
        title: 'Review previous sprint',
        description: 'Analyze previous sprint metrics',
        completed: false,
        startDate: createDate(2025, 4, 20, 9, 30),
        dueDate: createDate(2025, 4, 20, 10, 0),
        priority: 'high',
        attachments: [],
        comments: []
      }
    ]
  },
  {
    id: '2',
    title: 'Code Review 2',
    description: 'Review pull requests for the new feature',
    completed: true,
    startDate: createDate(2025, 4, 20, 11, 0),
    dueDate: createDate(2025, 4, 20, 12, 0),
    priority: 'medium',
    category: 'work',
    attachments: [],
    comments: [],
    subtasks: []
  },
  {
    id: '3',
    title: 'Client Presentation 3',
    description: 'Present project progress to the client',
    completed: false,
    startDate: createDate(2025, 4, 20, 14, 0),
    dueDate: createDate(2025, 4, 20, 15, 0),
    priority: 'high',
    category: 'work',
    attachments: [],
    comments: [],
    subtasks: [
      {
        id: '3-1',
        title: 'Prepare slides',
        description: 'Create presentation slides',
        completed: true,
        startDate: createDate(2025, 4, 20, 13, 0),
        dueDate: createDate(2025, 4, 20, 13, 45),
        priority: 'high',
        attachments: [],
        comments: []
      }
    ]
  },

  // Personal Category Tasks
  {
    id: '4',
    title: 'Morning Workout 4',
    description: 'Complete morning exercise routine',
    completed: true,
    startDate: createDate(2025, 4, 20, 7, 0),
    dueDate: createDate(2025, 4, 20, 8, 0),
    priority: 'medium',
    category: 'personal',
    attachments: [],
    comments: [],
    subtasks: [
      {
        id: '4-1',
        title: 'Cardio',
        description: '30 minutes cardio workout',
        completed: true,
        startDate: createDate(2025, 4, 20, 7, 0),
        dueDate: createDate(2025, 4, 20, 7, 30),
        priority: 'medium',
        attachments: [],
        comments: []
      },
      {
        id: '4-2',
        title: 'Strength Training',
        description: '30 minutes strength training',
        completed: true,
        startDate: createDate(2025, 4, 20, 7, 30),
        dueDate: createDate(2025, 4, 20, 8, 0),
        priority: 'medium',
        attachments: [],
        comments: []
      }
    ]
  },
  {
    id: '5',
    title: 'Read Book 5',
    description: 'Continue reading "The Psychology of Money"',
    completed: false,
    startDate: createDate(2025, 4, 20, 19, 0),
    dueDate: createDate(2025, 4, 20, 20, 0),
    priority: 'low',
    category: 'personal',
    attachments: [],
    comments: [],
    subtasks: []
  },
  {
    id: '6',
    title: 'Grocery Shopping 6',
    description: 'Buy groceries for the week',
    completed: false,
    startDate: createDate(2025, 4, 20, 16, 0),
    dueDate: createDate(2025, 4, 20, 17, 0),
    priority: 'medium',
    category: 'personal',
    attachments: [],
    comments: [],
    subtasks: [
      {
        id: '6-1',
        title: 'Make shopping list',
        description: 'Create list of needed items',
        completed: true,
        startDate: createDate(2025, 4, 20, 15, 30),
        dueDate: createDate(2025, 4, 20, 16, 0),
        priority: 'low',
        attachments: [],
        comments: []
      }
    ]
  }
]