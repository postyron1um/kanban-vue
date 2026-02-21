import { useQuery } from '@tanstack/vue-query'
import type { ITask } from './task.types'
import { taskApi } from '../api/task.api'
import type { MaybeRef } from 'vue'
import { computed, toValue } from 'vue'

export const useTasks = (projectId: MaybeRef<string>) => {
  return useQuery<ITask[]>({
    queryKey: computed(() => ['tasks', toValue(projectId)]),
    queryFn: () => taskApi.getTasks(toValue(projectId)),
    enabled: !!toValue(projectId),
    staleTime: 1 * 60 * 1000,
  })
}
