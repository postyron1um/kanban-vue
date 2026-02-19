import { api } from '@/shared/api/base'
import type { ITask, TUpdateTask } from '../model/task.types'

export const taskApi = {
  getTasks: async (): Promise<ITask> => {
    const res = await api.get('/tasks')

    return res.data
  },

  updateTask: async (taskId: string, payload: Partial<TUpdateTask>) => {
    const res = await api.patch(`/tasks/${taskId}`, payload)
    return res.data
  },
}
