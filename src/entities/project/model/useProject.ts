import { useQuery } from '@tanstack/vue-query'
import type { IProject } from './project.types'
import { projectApi } from '../api/project.api'
import { computed, toValue, type MaybeRef } from 'vue'

export const useProjects = (projectId: MaybeRef<string>) => {
  const projectQuery = useQuery<IProject>({
    queryKey: computed(() => ['project', toValue(projectId)]),
    queryFn: () => projectApi.getProjectById(toValue(projectId)),
    enabled: computed(() => !!toValue(projectId)),
    staleTime: 10 * 60 * 1000,
  })

  return {
    project: projectQuery,
  }
}
