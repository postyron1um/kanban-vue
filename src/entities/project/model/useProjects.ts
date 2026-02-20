import { useQuery } from '@tanstack/vue-query'
import type { IProject } from './project.types'
import { projectApi } from '../api/project.api'

export const useProjects = (projectId: string) => {
  const projectsQuery = useQuery<IProject[]>({
    queryKey: ['projects'],
    queryFn: () => projectApi.getProjects(),
  })

  const projectQuery = useQuery<IProject>({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getProjectById(projectId),
    enabled: !!projectId,
  })

  return {
    project: projectQuery,
    projects: projectsQuery,
  }
}
