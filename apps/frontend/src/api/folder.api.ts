import { api } from './axios'
import type { Folder } from '@/types/folder'
import type { File } from '@/types/file'

export const fetchFolderTree = () => {
  return api.get('/v1/folders')
}

export const fetchFolderContent = async (
  id: number,
): Promise<{ subfolders: Folder[]; files: File[] }> => {
  return api.get(`/v1/folders/${id}`)
}
