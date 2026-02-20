type TaskPriority = 'low' | 'medium' | 'high'

export interface ITask {
  id: string
  projectId: string
  columnId: string,
  order: number
  key: string
  title: string
  description?: string
  priority: TaskPriority,
  // assigneeId: string
  createdAt: string
}

export type TUpdateTask = Omit<ITask, 'id' | 'projectId' | 'key' | 'createdAt'>

export type TCreateTask = ITask
