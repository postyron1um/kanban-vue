import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { taskApi } from '@/entities/task'
import type { ITask, TCreateTask } from '@/entities/task/model/task.types'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const addTasksMutation = useMutation({
    mutationFn: (newTask: TCreateTask) => taskApi.createTask(newTask),

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<ITask[]>(['tasks'])

      queryClient.setQueryData(['tasks'], (old: ITask[] = []) => [...old, { ...newTask }])

      return { previousTasks }
    },

    onError: (error, newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    addTasksMutation,
  }
}
