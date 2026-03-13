import { api } from './axios'

export const uploadFile = (folderId: number, file: File) => {
  const form = new FormData()

  form.append('file', file)
  form.append('folderId', String(folderId))

  return api.post('/files/upload', form)
}

export const deleteFile = (id: number) => {
  return api.delete(`/files/${id}`)
}
