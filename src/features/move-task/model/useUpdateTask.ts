import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { taskApi } from '@/entities/task/api/task.api'
import type { ITask } from '@/entities/task'

export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<ITask> }) =>
      taskApi.updateTask(taskId, data),

    onMutate: async ({ taskId, data }, context) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', projectId] })

      const previousTasks = queryClient.getQueryData<ITask[]>(['tasks', projectId])

      queryClient.setQueryData<ITask[]>(['tasks', projectId], (old) => {
        if (!old) return []

        return old.map((task) => (task.id === taskId ? { ...task, ...data } : task))
      })

      return { previousTasks }
    },

    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', projectId], context.previousTasks)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}
