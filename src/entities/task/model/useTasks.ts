import { useQuery } from '@tanstack/vue-query'
import type { ITask } from './task.types'
import { taskApi } from '../api/task.api'

export const useTasks = (projectId: string) => {
  return useQuery<ITask[]>({
    queryKey: ['tasks', projectId],
    queryFn: () => taskApi.getTasks(projectId),
  })
}
