import { defineStore } from 'pinia'
import { fetchFolderTree, fetchFolderContent } from '@/api/folder.api'
import type { Folder } from '@/types/folder'
import type { FileItem } from '@/types/file'

export const useExplorerStore = defineStore('explorer', {
  state: () => ({
    folders: [] as Folder[],
    selectedFolder: null as Folder | null, // <-- add
    subFolders: [] as Folder[],
    files: [] as FileItem[],
    loading: false,
  }),

  actions: {
    async loadFolderTree() {
      this.loading = true
      try {
        const res = await fetchFolderTree()
        this.folders = res.data
      } finally {
        this.loading = false
      }
    },

    async selectFolder(folder: Folder) {
      this.loading = true
      try {
        const res = await fetchFolderContent(folder.id)
        console.log(res)

        this.selectedFolder = folder
        this.subFolders = res.folders
        this.files = res.files
      } finally {
        this.loading = false
      }
    },
  },
})
