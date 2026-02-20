import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { taskApi } from '@/entities/task/api/task.api'
import type { ITask } from '@/entities/task'

export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      taskId,
      data,
      columnId,
    }: {
      taskId: string
      data: Partial<ITask>
      columnId: string
    }) => taskApi.updateTask(taskId, data),

    onMutate: async ({ taskId, data }, contex) => {
      await contex.client.cancelQueries({ queryKey: ['tasks', projectId] })
      const previousTasks = contex.client.getQueryData<ITask[]>(['tasks', projectId])

      contex.client.setQueryData<ITask[]>(['tasks', projectId], (old) =>
        old?.map((task) => (task.id === taskId ? { ...task, ...data } : task)),
      )

      return { previousTasks }
    },

    onError: (err, variables, context) => {
      console.error('Ошибка мутации, откат:', err)
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', projectId], context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })
}
