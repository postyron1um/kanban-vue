import { useQuery } from '@tanstack/vue-query'
import type { IColumn } from './types'
import { columnApi } from '../api/column.api'

export const useColumns = (projectId: string | undefined) => {
  return useQuery<IColumn[]>({
    queryKey: ['columns', projectId],
    queryFn: () => columnApi.getColumns(projectId!),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  })
}
