import { api } from '@/shared/api/base'
import type { ITask, TCreateTask, TUpdateTask } from '../model/task.types'

export const taskApi = {
  getTasks: async (projectId: string): Promise<ITask[]> => {
    const res = await api.get(`/tasks?projectId=${projectId}`)

    return res.data
  },

  createTask: async (task: TCreateTask): Promise<ITask> => {
    const res = await api.post('/tasks', task)
    return res.data
  },

  updateTask: async (taskId: string, payload: Partial<TUpdateTask>) => {
    const res = await api.patch(`/tasks/${taskId}`, payload)
    return res.data
  },
}
