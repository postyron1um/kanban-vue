import { api } from '@/shared/api/base'
import type { IColumn } from '../model/types'

export const columnApi = {
  getColumns: async (params?: Record<string, unknown>): Promise<IColumn[]> => {
    const res = await api.get('/columns', {
      params,
    })
    return res.data
  },
}
