import { useQuery } from "@tanstack/vue-query"
import type { IProject } from "./project.types"
import { projectApi } from "../api/project.api"

export const useProjectsList = () => {
  return useQuery<IProject[]>({
    queryKey: ['projects'],
    queryFn: () => projectApi.getProjects(),
    staleTime : 10 * 60 * 1000
  })
}
