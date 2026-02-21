import { useQuery } from '@tanstack/vue-query'
import type { IColumn } from './types'
import { columnApi } from '../api/column.api'
import { computed, toValue, type MaybeRef } from 'vue'

export const useColumns = (projectId: MaybeRef<string>) => {
  return useQuery<IColumn[]>({
    queryKey: computed(() => ['columns', toValue(projectId)]) ,
    queryFn: () => columnApi.getColumns(toValue(projectId)),
    enabled: !!toValue(projectId),
    staleTime: 10 * 60 * 1000,
  })
}
