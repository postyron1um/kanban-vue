import { api } from '@/shared/api/base'
import type { IProject } from '../model/project.types'

export const projectApi = {
  getProjects: async (): Promise<IProject[]> => {
    const res = await api.get('/projects')
    return res.data
  },
  getProjectById: async (id: string):Promise<IProject> => {
    const res = await api.get(`/projects/${id}`)
    return res.data
  },
}
