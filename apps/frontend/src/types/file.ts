export interface FileItem {
  id: number
  name: string
  size: number
  mimeType?: string | null
  folderId: number
}

export interface File {
  id: number
  name: string
  path: string
  folderId: number
  size: number
  mimeType?: string | null
}
