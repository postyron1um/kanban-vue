import { api } from '@/shared/api/base'
import type { IColumn } from '../model/types'

export const columnApi = {
  getColumns: async (
    projectId: string,
    additionalParams?: Record<string, unknown>,
  ): Promise<IColumn[]> => {
    const params = { projectId, ...additionalParams }
    const res = await api.get('/columns', { params })
    return res.data
  },
}
