type TaskPriority = 'low' | 'meduim' | 'high'

export interface ITask {
  id: string
  projectId: string
  columnId: string
  key: string
  title: string
  description?: string
  priority: TaskPriority
  assigneeId: string
  createdAt: string
}

export type TUpdateTask = Omit<ITask, 'id' | 'projectId' | 'key' | 'createdAt'>
